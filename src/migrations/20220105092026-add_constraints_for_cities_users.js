'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Users', 'constr_mess_id',);
    queryInterface.addConstraint('Users',
        {
      fields:['messenger_id', 'user_type'],
      type: 'unique',
      name: 'pair_unique_constraint'
        });
    queryInterface.addConstraint('Cities',
        {
          fields: ['city_name'],
          type: 'unique',
          name: 'city_unique'
        })

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
