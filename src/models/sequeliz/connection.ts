import dotenv from "dotenv";
dotenv.config()
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 3306),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
