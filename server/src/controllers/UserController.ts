import { Request, Response } from "express";
import { SignCallback, sign } from 'jsonwebtoken';
import { secret } from '@config/config.json';
import { hash, compare } from 'bcrypt';
import User from '@models/User';

const SALT_ROUNDS = 8;

class UserController {

    public register = async (req: Request, res: Response) => {
        console.log("POST /register");

        const { email, password, pseudo, avatar } = req.body;

        if (!email || email === '' || !password || password === '' || !pseudo || pseudo === '' || !avatar || avatar === '') {
            res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
            return;
        }

        const user = new User();
        user.email = email;
        user.password = await hash(password, SALT_ROUNDS);
        user.role = 'user';
        user.pseudo = pseudo;
        user.avatar = avatar;

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
        if (!regexEmail.test(email)) {
            res.status(400).send({ message: 'Veuillez rentrer un email valide' });
            return;
        }

        try {
            await user.save();
        } catch (error: any) {
            res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
            return
        }
    }

    public login = async (req: Request, res: Response) => {
        console.log("POST /login", req.body);

        const { email, password } = req.body;

        if (!email || !password || email === '' || password === '') {
            res.status(400).send({ message: 'Bad request' });
            return;
        }

        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            res.status(401).send({ message: 'Email not matching' });
            return;
        }

        const allowed = await compare(password, user.password);

        if (allowed) {
            sign({ id: user.id }, secret, { expiresIn: '72h' }, (error: Error | null, encoded: string | undefined): void => {
                if (error) {
                    res.status(500).send({ message: 'Internal server error' });
                } else {
                    res.status(200).send({ encoded });
                }
            });
        } else {
            res.status(401).send({ message: 'Password not matching' });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        console.log("GET /user");

        const users = await User.findAll();

        res.status(200).send({ users });
    }

    public getOne = async (req: Request, res: Response) => {
        console.log("GET /user/:id");

        const { id } = req.params;

        if (!id || id === '') {
            res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
            return;
        }

        const user = await User.findOne({
            where: {
                id
            }
        });

        if (!user) {
            res.status(404).send({ message: 'User not found' });
            return;
        }

        res.status(200).send({ user });
    }

    public update = async (req: Request, res: Response) => {
        console.log("PUT /user/:id");

        const { id } = req.params;

        if (!id || id === '') {
            res.status(400).send({ message: 'id not found' });
            return;
        }

        const user = await User.findOne({
            where: {
                id
            }
        });

        if (!user) {
            res.status(404).send({ message: 'User not found' });
            return;
        }

        const { email, password, role, pseudo, avatar } = req.body;

        if (!email || email === '' || !password || password === '' || !role || role === '' || !pseudo || pseudo === '' || !avatar || avatar === '') {
            res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
            return;
        }

        user.email = email;
        user.password = await hash(password, SALT_ROUNDS);
        user.role = role;
        user.pseudo = pseudo;
        user.avatar = avatar;

        try {
            await user.save();
        } catch (error: any) {
            res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
            return
        }

        res.status(200).send({ user });
    }

    public delete = async (req: Request, res: Response) => {
        console.log("DELETE /user/:id");

        const { id } = req.params;

        if (!id || id === '') {
            res.status(400).send({ message: 'id not found' });
            return;
        }

        const user = await User.findOne({
            where: {
                id
            }
        });

        if (!user) {
            res.status(404).send({ message: 'User not found' });
            return;
        }

        try {
            await user.destroy();
        } catch (error: any) {
            res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
            return
        }
    }
}

export default UserController;