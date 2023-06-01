'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create table following models

    /*
      User:
      declare id: number;
      declare email: string;
      declare password: string;
      declare role: string;
      declare pseudo: string;
      declare avatar: string;
      declare readonly createdAt: Date;
      declare readonly updateAt: Date;
     */
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      role: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      pseudo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      avatar: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    /*
      Choice:
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
      */
    await queryInterface.createTable('choice', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      effect: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    /*
      Event:
      declare id: number;
      declare type: string;
      declare title : string;
      declare description: string;
      declare level: number;
      declare choices: Choice[];
      declare readonly createdAt: Date;
      declare readonly updateAt: Date;
      */
    await queryInterface.createTable('event', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      choices: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    /*
      Game:
      declare id: number;
      declare userId: number;
      declare user: User;
      

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
