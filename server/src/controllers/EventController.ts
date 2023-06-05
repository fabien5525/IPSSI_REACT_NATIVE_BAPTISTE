import { Request, Response } from "express";
import Event from "../database/models/Event";

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
    }
}

export default EventController;