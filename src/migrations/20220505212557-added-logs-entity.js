'use strict';

const {DataType} = require("sequelize-typescript");
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable('logs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataType.INTEGER.UNSIGNED
            },
            logTypeId: {
                allowNull: false,
                type: DataType.INTEGER.UNSIGNED,
                references: {
                    model: 'log_types'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            data: {
                allowNull: false,
                type: DataType.ENUM('subscribed', 'canceled', 'expired', 'registered'),
            },
            createdAt: {
                type: DataType.DATE,
                allowNull: false,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        queryInterface.dropTable('logs');
    }
};
