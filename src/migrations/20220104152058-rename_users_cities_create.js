'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('users_cities_create', 'users_cities')

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
