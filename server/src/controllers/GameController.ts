import { Request, Response } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from 'middleware';
import { secret } from '../../config/config.json';
import User from '../database/models/User';
import Game from '../database/models/Game';
import Event from '../database/models/Event';
import { Sequelize } from 'sequelize';
import GameEvent from '../database/models/GameEvent';

class GameController {
    public getOne = async (req: Request, res: Response) => {
        console.log('GET /game')

        let user: User | null = null;

        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                return res.status(401).send('Le bearer token est manquant.');
            }

            const decoded = verify(token, secret);
            (req as CustomRequest).token = decoded;

            const userId: string = (decoded as JwtPayload).id ?? "";

            user = await User.findOne({
                where: {
                    id: userId
                }
            });

            if (!user) {
                return res.status(401).send('Vous n\'avez pas les droits pour effectuer cette action.');
            }
        } catch (err) {
            console.error('Please authenticate', err);
            res.status(401).send({ message: 'Please authenticate' });
            return;
        }

        if (!user) {
            res.status(401).send({ message: 'Une erreur est survenue' });
            return;
        }

        //get user's most recent game, if no game or finished game, create new game
        let game = await Game.findOne({
            where: {
                userId: user?.id,
                status: 'in progress'
            },
            order: [['createdAt', 'DESC']]
        });

        if (!game) {
            game = new Game();
            game.userId = user.id;
            game.status = 'inProgress';

            const events = [];

            try {
                events[0] = await Event.findOne({ where: { level: 0 }, order: Sequelize.literal('rand()') });
                events[1] = await Event.findOne({ where: { level: 1 }, order: Sequelize.literal('rand()') });
                events[2] = await Event.findOne({ where: { level: 2 }, order: Sequelize.literal('rand()') });
                events[3] = await Event.findOne({ where: { level: 3 }, order: Sequelize.literal('rand()') });
                events[4] = await Event.findOne({ where: { level: 4 }, order: Sequelize.literal('rand()') });
                events[5] = await Event.findOne({ where: { level: 5 }, order: Sequelize.literal('rand()') });
                events[6] = await Event.findOne({ where: { level: 6 }, order: Sequelize.literal('rand()') });

                events.forEach(async (event, index) => {
                    if (event instanceof Event) {
                        const ge = new GameEvent({
                            gameId: game?.id,
                            eventId: event.id
                        });
                        await ge.save();
                    } else {
                        console.warn(`Event ${index}, no corresponding event found`);
                    }
                });

            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Une erreur est survenue' });
                return;
            }

            try {
                await game.save();
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: 'Une erreur est survenue' });
                return;
            }

        }

        res.status(200).send(game);
    }

    public getGameEvents = async (req: Request, res: Response) => {
        console.log('GET /game/:id/event')

        const gameId = req.params.id;

        if (!gameId) {
            res.status(400).send({ message: 'Une erreur est survenue' });
            return;
        }

        let game: Game | null = null;

        try {
            game = await Game.findOne({
                where: {
                    id: gameId
                }
            });

            if (!game) {
                res.status(400).send({ message: 'Une erreur est survenue' });
                return;
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Une erreur est survenue' });
            return;
        }

        if (!game) {
            res.status(400).send({ message: 'Une erreur est survenue' });
            return;
        }

        res.status(200).send(await game.events());
    }

    public applyEffect = async (req: Request, res: Response) => {
        console.log('POST /game/:id/applyEffect')

        const gameId = req.params.id;

        if (!gameId) {
            res.status(400).send({ message: 'Une erreur est survenue' });
            return;
        }

        let game: Game | null = null;

        try {
            game = await Game.findOne({
                where: {
                    id: gameId
                }
            });

            if (!game) {
                res.status(400).send({ message: 'Une erreur est survenue' });
                return;
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Une erreur est survenue' });
            return;
        }

        if (!game) {
            res.status(400).send({ message: 'Une erreur est survenue' });
            return;
        }

        const { effect }: {
            effect: {
                title: string,
                description: string,
                health: number,
                strength: number,
                speed: number,
            }
        } = req.body;

        if (!effect) {
            res.status(400).send({ message: 'Une erreur est survenue' });
            return;
        }

        game.stats.health += effect.health;
        game.stats.strength += effect.strength;
        game.stats.speed += effect.speed;

        try {
            await game.save();
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Une erreur est survenue' });
            return;
        }

        res.status(200).send(game);
    }
}

export default GameController;