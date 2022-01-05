'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('weather_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lat: {
        allowNull:true,
        type: Sequelize.FLOAT
      },
      lon: {
        allowNull:true,
        type: Sequelize.FLOAT
      },
      timezone: {
        allowNull:true,
        type: Sequelize.STRING
      },
      timezone_offset: {
        allowNull:true,
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('weather_data');
  }
};