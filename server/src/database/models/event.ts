import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Choice from "../models/Choice";
import Game from "../models/Game";
import GameEvent from "../models/GameEvent";


class Event extends Model {
    declare id: number;
    declare title: string;
    declare type: string;
    declare description: string;
    declare level: number;
    declare readonly createdAt: Date;
    declare readonly updateAt: Date;

    public games = async (): Promise<Game[]> => {
        const gameEvents: GameEvent[] = await GameEvent.findAll({
            where: {
                eventId: this.id
            }
        });
        const games = await Promise.all(gameEvents.map(async (gameEvent) => {
            const game = await gameEvent.game();
            return game ?? null;
        }));
        const sortedGames: Game[] = [];
        games.forEach((game) => {
            if (game) {
                sortedGames.push(game);
            }
        });
        return sortedGames;
    }

    public choices = async (): Promise<Choice[]> => {
        const choices: Choice[] = await Choice.findAll({
            where: {
                eventId: this.id
            }
        });
        return choices;
    }
}

Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, { sequelize, modelName: "event", tableName: "event" });

export default Event;