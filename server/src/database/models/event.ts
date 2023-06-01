import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Choice from "./choice";

class Event extends Model {
    declare id: number;
    declare type: string;
    declare title : string;
    declare description: string;
    declare level: number;
    declare choices: Choice[];
    declare readonly createdAt: Date;
    declare readonly updateAt: Date;
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