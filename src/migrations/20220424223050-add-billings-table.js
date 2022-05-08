'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable('billings_data', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customerId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            subscriptionId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            billings_period_end: {
                allowNull: true,
                type: Sequelize.DATE
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        });
    },

    async down(queryInterface, Sequelize) {
        queryInterface.dropTable('billings_data')
    }
};
