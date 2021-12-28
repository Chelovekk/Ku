'use strict';
import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import {Weather_data} from "./weather_data";
const env =  'development';
const config = require(__dirname + '/../config/config')[env];
// import config from "../config/config"
const db:any = {};

console.log(process.env.DB_USERNAME)

const sequelize = new Sequelize(config.database!, config.username!, config.password!, config)

sequelize.addModels([Weather_data])

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
