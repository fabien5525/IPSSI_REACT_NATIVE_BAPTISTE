import express from 'express';
import cors from 'cors';

const PORT = 19001;

const app = express();

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
