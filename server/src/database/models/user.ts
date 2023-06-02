import { DataTypes, Model } from "sequelize";
import sequelize from "@database/database";

class User extends Model {
    declare id: number;
    declare email: string;
    declare password: string;
    declare role: string;
    declare pseudo: string;
    declare avatar: string;
    declare readonly createdAt: Date;
    declare readonly updateAt: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    pseudo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, { sequelize, modelName: "user", tableName: "user" });

export default User;