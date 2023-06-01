import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Choice extends Model {
    declare id: number;
    declare title: string;
    declare effect: {
        title: string;
        health: number;
        strength: number;
        speed: number;
    }[];
    declare readonly createdAt: Date;
    declare readonly updateAt: Date;
}

Choice.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    effect: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('effect');
            if (!rawValue) {
                return [];
            }
            return JSON.parse(rawValue)
        },
        set(value: {
            title: string;
            health: number;
            strength: number;
            speed: number;
        }[]) {
            this.setDataValue('images', JSON.stringify(value));
        }
    }
}, { sequelize, modelName: "choice", tableName: "choice" });

export default Choice;
