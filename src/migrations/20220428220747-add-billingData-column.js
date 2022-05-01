'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'billingsDataId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'billings_data',
        key: 'id'
      }})
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'billingsDataId')
  }
};
