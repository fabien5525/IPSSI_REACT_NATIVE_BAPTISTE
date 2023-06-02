import express from 'express';
import cors from 'cors';
import UserController from '@controllers/UserController';
import Event from '@models/Event';
import Choice from '@models/Choice';

const PORT = 19001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userController = new UserController();

app.post('/register', userController.register);

app.post('/login', userController.login);

app.get('/user', userController.getAll);

app.get('/user/:id', userController.getOne);

app.put('/user/:id', userController.update);

app.delete('/user/:id', userController.delete);

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
