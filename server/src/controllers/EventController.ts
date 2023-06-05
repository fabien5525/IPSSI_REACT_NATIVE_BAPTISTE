import { Request, Response } from "express";
import Event from "../database/models/Event";
import Choice from "../database/models/Choice";

class EventController {
    public getAll = async (req: Request, res: Response) => {
        console.log("GET /event");

        const events = await Event.findAll();

        res.status(200).send({ events });
    }

    public getOne = async (req: Request, res: Response) => {
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
    }

    public create = async (req: Request, res: Response) => {
        console.log("POST /event");

        const { title, type, description, level } = req.body;

        if (!title || title === '' || !type || type === '' || !description || description === '') {
            console.error("Veuillez rentrer des informations valides", req.body, title, type, description, level)
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
            console.error(error)
            res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
            return
        }

        res.status(200).send({ event });
    }

    public update = async (req: Request, res: Response) => {
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

        const { title, type, description, level } = req.body;

        if (!title || title === '' || !type || type === '' || !description || description === '' || !level || level === '') {
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
    }

    public delete = async (req: Request, res: Response) => {
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
    }

    public getChoices = async (req: Request, res: Response) => {
        console.log("GET /event/:id/choice");

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
    }

    public addChoice = async (req: Request, res: Response) => {
        console.log("POST /event/:id/choice");

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
            console.error("Event not found", id)
            res.status(404).send({ message: 'Event not found' });
            return;
        }

        const { title, effect } = req.body;

        if (!title || title === '' || !effect || effect === '') {
            res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
            return;
        }

        const choice = new Choice();
        choice.eventId = event.id;
        choice.title = title;
        choice.effect = effect;

        try {
            await choice.save();
        } catch (error: any) {
            console.error(error)
            res.status(500).send({ message: error?.errors?.map((err: any) => err.message + " ") });
            return
        }

        res.status(200).send({ choice });
    }

    public updateChoice = async (req: Request, res: Response) => {
        console.log("PUT /event/:id/choice/:id");

        const { id, choiceId } = req.params;

        if (!id || id === '' || !choiceId || choiceId === '') {
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

        const choice = await Choice.findOne({
            where: {
                id: choiceId
            }
        });

        if (!choice) {
            res.status(404).send({ message: 'Choice not found' });
            return;
        }

        const { title, effect } = req.body;

        if (!title || title === '' || !effect || effect === '') {
            console.error('Veuillez rentrer des informations valides', req.body)
            res.status(400).send({ message: 'Veuillez rentrer des informations valides' });
            return;
        }

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

    public deleteChoice = async (req: Request, res: Response) => {
        console.log("DELETE /event/:id/choice/:id");

        const { id, choiceId } = req.params;

        if (!id || id === '' || !choiceId || choiceId === '') {
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

        const choice = await Choice.findOne({
            where: {
                id: choiceId
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

export default EventController;