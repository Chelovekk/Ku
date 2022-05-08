'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('billings_data', 'billings_period_end', {
      type: DataTypes.BIGINT
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('billings_data', 'billings_period_end', {
      type: DataTypes.DATE
    })
  }
};
