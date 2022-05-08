'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // queryInterface.removeConstraint('users', 'constr_mess_id',);
    // queryInterface.addConstraint('users',
    //     {
    //   fields:['messenger_id', 'user_type'],
    //   type: 'unique',
    //   name: 'pair_unique_constraint'
    //     });
    queryInterface.addConstraint('cities',
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
