'use strict';

const {DataType} = require("sequelize-typescript");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('city_weather_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      temp: {
        allowNull:false,
        type:Sequelize.INTEGER
      },
      feels_like: {
        allowNull:false,
        type:Sequelize.INTEGER
      },
      speed: {
        allowNull:false,
        type:Sequelize.INTEGER
      },
      humidity:{
        allowNull:false,
        type:Sequelize.INTEGER
      },
      city_id: {
        allowNull:false,
        type:Sequelize.INTEGER,
        references: { model: 'cities', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
  }
}
