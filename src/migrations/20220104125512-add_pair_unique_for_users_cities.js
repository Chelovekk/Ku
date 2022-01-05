'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('users_cities_create',
        {
          fields:['user_id', 'city_id'],
          type: 'unique',
          name: 'pair_unique_constraint'
        },
        );

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
