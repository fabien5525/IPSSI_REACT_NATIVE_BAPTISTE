import express from 'express';
import cors from 'cors';
import { Database  } from 'sqlite3';

const PORT = 19001;

const app = express();

const db = new Database('database.sqlite');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('*', async (req, res) => {
    console.log("GET *");
    res.status(404).send({ error: 'not found' });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
