import express from 'express';
import cors from 'cors';
import { SignCallback, sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { secret } from '../config/config.json';
import User from './database/models/user';
import Event from './database/models/event';
import Choice from './database/models/choice';

const PORT = 19001;
const SALT_ROUNDS = 8;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/register', async (req, res) => {
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
});

app.post('/login', async (req, res) => {
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
});

app.get('/user', async (req, res) => {
    console.log("GET /user");

    const users = await User.findAll();

    res.status(200).send({ users });
});

app.get('/user/:id', async (req, res) => {
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
});

app.put('/user/:id', async (req, res) => {
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
});

app.delete('/user/:id', async (req, res) => {
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
});

app.get('/event', async (req, res) => {
    console.log("GET /event");

    const events = await Event.findAll();

    res.status(200).send({ events });
});

app.post('/event', async (req, res) => {
    console.log("POST /event");

    const { title, type, description, level } = req.body;

    if (!title || title === '' || !type || type === '' || !description || description === '' || !level || level === '') {
        res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
        return;
    }

    const event = new Event();
    event.title = title;
    event.type = type;
    event.description = description;
    event.level = level;

    try {
        await event.save();
    } catch (error: any) {
        res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
        return
    }

    res.status(200).send({ event });
});

app.get('/event/:id', async (req, res) => {
    console.log("GET /event/:id");

    const { id } = req.params;

    if (!id || id === '') {
        res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
        return;
    }

    const event = await Event.findOne({
        where: {
            id
        }
    });

    if (!event) {
        res.status(404).send({ message: 'Event not found' });
        return;
    }

    res.status(200).send({ event });
});

app.put('/event/:id', async (req, res) => {
    console.log("PUT /event/:id");

    const { id } = req.params;

    if (!id || id === '') {
        res.status(400).send({ message: 'id not found' });
        return;
    }

    const event = await Event.findOne({
        where: {
            id
        }
    });

    if (!event) {
        res.status(404).send({ message: 'Event not found' });
        return;
    }

    const { title, type, description, level, choices } = req.body;

    if (!title || title === '' || !type || type === '' || !description || description === '' || !level || level === '' || !choices || choices === '') {
        res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
        return;
    }

    event.title = title;
    event.type = type;
    event.description = description;
    event.level = level;

    try {
        await event.save();
    } catch (error: any) {
        res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
        return
    }

    res.status(200).send({ event });
});

app.delete('/event/:id', async (req, res) => {
    console.log("DELETE /event/:id");

    const { id } = req.params;

    if (!id || id === '') {
        res.status(400).send({ message: 'id not found' });
        return;
    }

    const event = await Event.findOne({
        where: {
            id
        }
    });

    if (!event) {
        res.status(404).send({ message: 'Event not found' });
        return;
    }

    try {
        await event.destroy();
    } catch (error: any) {
        res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
        return
    }

    res.status(200).send({ event });
});

app.get('/event/:id/choices', async (req, res) => {
    console.log("GET /event/:id/choices");

    const { id } = req.params;

    if (!id || id === '') {
        res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
        return;
    }

    const event = await Event.findOne({
        where: {
            id
        }
    });

    if (!event) {
        res.status(404).send({ message: 'Event not found' });
        return;
    }

    res.status(200).send({ choices: await event.choices() });
});

app.get('/choice', async (req, res) => {
    console.log("GET /choice");

    const choices = await Choice.findAll();

    res.status(200).send({ choices });
});

app.get('/choice/:id', async (req, res) => {
    console.log("GET /choice/:id");

    const { id } = req.params;

    if (!id || id === '') {
        res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
        return;
    }

    const choice = await Choice.findOne({
        where: {
            id
        }
    });

    if (!choice) {
        res.status(404).send({ message: 'Choice not found' });
        return;
    }

    res.status(200).send({ choice });
});

app.put('/choice/:id', async (req, res) => {
    console.log("PUT /choice/:id");

    const { id } = req.params;

    if (!id || id === '') {
        res.status(400).send({ message: 'id not found' });
        return;
    }

    const choice = await Choice.findOne({
        where: {
            id
        }
    });

    if (!choice) {
        res.status(404).send({ message: 'Choice not found' });
        return;
    }

    const { eventId, title, effect } = req.body;

    if (!eventId || eventId === '' || !title || title === '' || !effect || effect === '') {
        res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
        return;
    }

    choice.eventId = eventId;
    choice.title = title;
    choice.effect = effect;

    try {
        await choice.save();
    } catch (error: any) {
        res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
        return
    }

    res.status(200).send({ choice });
});

app.delete('/choice/:id', async (req, res) => {
    console.log("DELETE /choice/:id");

    const { id } = req.params;

    if (!id || id === '') {
        res.status(400).send({ message: 'id not found' });
        return;
    }

    const choice = await Choice.findOne({
        where: {
            id
        }
    });

    if (!choice) {
        res.status(404).send({ message: 'Choice not found' });
        return;
    }

    try {
        await choice.destroy();
    } catch (error: any) {
        res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
        return
    }

    res.status(200).send({ choice });
});

app.get('*', async (req, res) => {
    console.log("GET *");
    res.status(404).send({ message: 'Not found' });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
