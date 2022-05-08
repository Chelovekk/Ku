'use strict';
import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import {Weather_data} from "./weather_data";
import {Cities} from "./cities";
import {Users} from "./users";
import {Users_cities} from "./users_cities";
import {City_weather_data} from "./city_weather_data";
import {BilingsData} from "./biling_data";

const env =  'development';
import config from "../config/config.json"
const database:any = {};
import {sequelize} from "./sequeliz/connection";



sequelize.addModels([Weather_data, Cities, Users, Users_cities, City_weather_data, BilingsData])

database.sequelize = sequelize;
database.Sequelize = Sequelize;

export const db = database;