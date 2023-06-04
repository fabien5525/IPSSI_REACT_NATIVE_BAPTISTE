import { DataTypes, Model } from "sequelize";
import sequelize from "@database/database";
import Game from "@models/Game";
import Event from "@models/Event";

class GameEvent extends Model {
    declare gameId: number;
    declare eventId: number;
    declare readonly createdAt: Date;
    declare readonly updateAt: Date;

    public game = (): Promise<Game | null> => {
        return Game.findOne({
            where: {
                id: this.gameId
            }
        });
    }

    public event = (): Promise<Event | null> => {
        return Event.findOne({
            where: {
                id: this.eventId
            }
        });
    }
}

GameEvent.init({
    gameId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, { sequelize, modelName: "gameEvent", tableName: "gameEvent" });

export default GameEvent;

