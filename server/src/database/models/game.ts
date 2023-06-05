import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import User from "../models/User";
import GameEvent from "../models/GameEvent";
import Event from "../models/Event";

class Game extends Model {
    declare id: number;
    declare status: 'inProgress' | 'finished';
    declare userId: number;
    declare stats: {
        health: number;
        strength: number;
        speed: number;
    };
    declare readonly createdAt: Date;
    declare readonly updateAt: Date;

    public user = async (): Promise<User | null> => {
        return this.userId ? await User.findOne({
            where: {
                id: this.userId
            }
        }) : null;
    }

    private events = async (): Promise<Event[]> => {
        const gameEvents: GameEvent[] = await GameEvent.findAll({
            where: {
                gameId: this.id
            }
        });
        const events = await Promise.all(gameEvents.map(async (gameEvent) => {
            const event = await gameEvent.event();
            return event ?? null;
        }));
        const sortedEvents: Event[] = [];
        events.forEach((event) => {
            if (event) {
                sortedEvents.push(event);
            }
        });
        return sortedEvents;
    }
}

Game.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stats: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('stats');
            if (!rawValue) {
                return [];
            }
            return JSON.parse(rawValue)
        },
        set(value: {
            health: number;
            strength: number;
            speed: number;
        }) {
            this.setDataValue('stats', JSON.stringify(value));
        }
    }
}, { sequelize, modelName: "game", tableName: "game" });

export default Game;