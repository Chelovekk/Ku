'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn('telegram')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
