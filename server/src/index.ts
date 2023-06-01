import express from 'express';
import cors from 'cors';

const PORT = 19001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/login', async (req, res) => {
    console.log("POST /login");
    res.status(401).send({ message: 'OK' });
});

app.get('*', async (req, res) => {
    console.log("GET *");
    res.status(404).send({ message: 'Not found' });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
