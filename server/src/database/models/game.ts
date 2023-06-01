import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import User from "./user";

class Game extends Model {
    declare id: number;
    declare status: 'inProgress' | 'finished';
    declare userId: number;
    declare events: Event[];
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
    events: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('events');
            if (!rawValue) {
                return [];
            }
            return JSON.parse(rawValue)
        },
        set(value: Event[]) {
            this.setDataValue('events', JSON.stringify(value));
        }
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