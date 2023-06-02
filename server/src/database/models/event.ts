import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Choice from "./choice";
import GameEvent from "./gameEvent";
import Game from "./game";

class Event extends Model {
    declare id: number;
    declare type: string;
    declare title: string;
    declare description: string;
    declare level: number;
    declare choices: Choice[];
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
    choices: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('choices');
            if (!rawValue) {
                return [];
            }
            return JSON.parse(rawValue)
        },
        set(value: Choice[]) {
            this.setDataValue('choices', JSON.stringify(value));
        }
    }
}, { sequelize, modelName: "event", tableName: "event" });

export default Event;