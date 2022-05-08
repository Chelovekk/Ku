'use strict';

const {DataType} = require("sequelize-typescript");
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable('log_types', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER.UNSIGNED
            },
            type: {
                allowNull: false,
                type: DataType.ENUM('discord_user','telegram_user'),
            },
        })
    },

    async down(queryInterface, Sequelize) {
        queryInterface.dropTable('log_types');
    }
};
