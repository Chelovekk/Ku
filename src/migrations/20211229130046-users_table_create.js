'use strict';

const {DataType} = require("sequelize-typescript");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users",{
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      user_type: {
        allowNull: false,
        type: DataType.ENUM('discord_user','telegram_user'),
      },
      messenger_id: {
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
