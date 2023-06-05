import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';
import { secret } from '../config/config.json';
import User from './database/models/User';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    console.log('middleware isAdmin');
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).send('Le bearer token est manquant.');
        }

        const decoded = verify(token, secret);
        (req as CustomRequest).token = decoded;

        const userId: string = (decoded as JwtPayload).id ?? "";

        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(401).send('Vous n\'avez pas les droits pour effectuer cette action.');
        }

        if (user.role !== "admin") {
            return res.status(401).send('Vous n\'avez pas les droits pour effectuer cette action.');
        }

        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
}

const createToken = (user: User): string => {
    if (!user.id) {
        throw new Error('User id is undefined');
    }

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    const token = sign(payload, secret, {
        expiresIn: '2 days',
    });

    return token;
}

export { isAdmin, createToken };