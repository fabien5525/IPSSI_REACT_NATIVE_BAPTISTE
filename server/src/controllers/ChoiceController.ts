import Choice from "../database/models/Choice";
import { Request, Response } from "express";

class ChoiceController {

    public getAll = async (req: Request, res: Response) => {
        console.log("GET /choice");

        const choices = await Choice.findAll();

        res.status(200).send({ choices });
    }

    public getOne = async (req: Request, res: Response) => {
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
    }

    public update = async (req: Request, res: Response) => {
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
    }

    public delete = async (req: Request, res: Response) => {
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
    }
}

export default ChoiceController;