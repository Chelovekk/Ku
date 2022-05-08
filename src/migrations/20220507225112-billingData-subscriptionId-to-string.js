'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('billings_data', 'subscriptionId', {
      type: DataTypes.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('billings_data', 'subscriptionId', {
      type: DataTypes.INTEGER
    })
  }
};
