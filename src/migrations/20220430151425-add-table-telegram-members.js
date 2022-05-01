'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('telegram-user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER.UNSIGNED
        },
        telegram_id: {
            allowNull: false,
            type: Sequelize.STRING
        },
    })
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
