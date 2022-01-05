'use strict';
import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import {Weather_data} from "./weather_data";
import {Cities} from "./cities";
import {Users} from "./users";
import {Users_cities} from "./users_cities";
import {City_weather_data} from "./city_weather_data";
const env =  'development';
const config = require(__dirname + '/../config/config')[env];
// import config from "../config/config"
const db:any = {};

console.log(process.env.DB_USERNAME)

const sequelize = new Sequelize(config.database!, config.username!, config.password!, config)

sequelize.addModels([Weather_data, Cities, Users, Users_cities, City_weather_data])

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;