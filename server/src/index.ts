import express from 'express';
import cors from 'cors';
import { sign } from 'jsonwebtoken';
import User from './database/models/user';
import { hash, compare } from 'bcrypt';

import { secret } from '../config/config.json';
const PORT = 19001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/register', async (req, res) => {
    console.log("POST /register");

    const { email, password, pseudo, avatar } = req.body;

    if (!email || !password || email === '' || password === '') {
        res.status(400).send({ message: 'Bad request' });
        return;
    }

    const user = new User();
    user.email = email;
    user.password = await hash(password, 8);
    user.role = 'user';
    user.pseudo = pseudo;
    user.avatar = avatar;
    await user.save();

    sign({ id: user.id }, secret, { expiresIn: '72h' }, (err: any, token: any) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        return res.status(200).send({ token });
    });

    return res.status(400).send({ message: 'Error while sign' });
});

app.post('/login', async (req, res) => {
    console.log("POST /login");

    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return res.status(400).send({ message: 'Bad request' });
    }

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(401).send({ message: 'Email not matching' });
    }

    const allowed = await compare(password, user.password);

    if (allowed) {
        sign({ id: user.id }, secret, { expiresIn: '72h' }, (err: any, token: any) => {
            if (err) {
                return res.status(500).send({ message: 'Internal server error' });
            }
            return res.status(200).send({ token });
        });
    } else {
        return res.status(401).send({ message: 'Password not matching' });
    }
});

app.get('*', async (req, res) => {
    console.log("GET *");
    return res.status(404).send({ message: 'Not found' });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
