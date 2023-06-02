import { Secret, verify, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { secret } from '@config/config.json';
import User from '@models/User';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).send('Le bearer token est manquant.');
        }

        const decoded = verify(token, secret);
        (req as CustomRequest).token = decoded;

        const rawRoles = (decoded as JwtPayload).roles ?? [];
        const roles: string[] = (typeof rawRoles === 'string') ? JSON.parse(rawRoles) : rawRoles;

        if (!roles.includes('ROLE_ADMIN')) {
            return res.status(401).send('Vous n\'avez pas les droits pour effectuer cette action.');
        }

        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
}

const createToken = (user: User): string => {
    const SECRET: Secret = process.env.SECRET as Secret;

    if (!user._id) {
        throw new Error('User _id is undefined');
    }

    const payload = {
        _id: user._id ? user._id.toString() : '',
        email: user.email,
        roles: user.roles
    }

    const token = jwt.sign(payload, SECRET, {
        expiresIn: '2 days',
    });

    return token;
}

export { isAdmin, createToken };