import express from 'express';
import cors from 'cors';
import UserController from './controllers/UserController';
import EventController from './controllers/EventController';
import ChoiceController from './controllers/ChoiceController';
import { isAdmin } from './middleware';

const PORT = 19001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userController = new UserController();
const eventController = new EventController();
const choiceController = new ChoiceController();

app.post('/register', userController.register);
app.post('/login', userController.login);

app.get('/user', isAdmin, userController.getAll);
app.get('/user/:id', isAdmin, userController.getOne);
app.put('/user/:id', isAdmin, userController.update);
app.delete('/user/:id', isAdmin, userController.delete);

app.get('/event', isAdmin, eventController.getAll);
app.post('/event', isAdmin, eventController.create);
app.get('/event/:id', isAdmin, eventController.getOne);
app.put('/event/:id', isAdmin, eventController.update);
app.delete('/event/:id', isAdmin, eventController.delete);
app.get('/event/:id/choices', isAdmin, eventController.getChoices);

app.get('/choice', isAdmin, choiceController.getAll);
app.get('/choice/:id', isAdmin, choiceController.getOne);
app.put('/choice/:id', isAdmin, choiceController.update);
app.delete('/choice/:id', isAdmin, choiceController.delete);

app.get('*', async (req, res) => {
    console.log("GET *");
    res.status(404).send({ message: 'Not found' });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
