'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn(
            'users',
            'createdAt',
            {
              allowNull: false,
              type: Sequelize.DATE
            }
        ),
      queryInterface.addColumn(
          'users',
          'updatedAt',
          {
            allowNull: false,
            type: Sequelize.DATE
          }
      )
    ])
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
