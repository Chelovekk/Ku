import { TelegramBot } from "./telegram_bot/TelegramBot";
import {DiscordBot} from "./discord_bot/DiscordBot";
import dotenv from 'dotenv';
import express from 'express';
import {Weather_data} from "./models/weather_data";
import {RequestData} from "./Request/Request";
import {OpenweatherData} from "./Request/Request.interface";
const db  = require("./models/index")
dotenv.config();


(async ()=> {
    const data: OpenweatherData = await new RequestData().getWeatherData() as OpenweatherData;
    await Weather_data.create(data);

})()

const tgBot = new TelegramBot();
const dsBot = new DiscordBot();

dsBot.bot.login(process.env.DISCORD_BOT_TOKEN);
tgBot.bot.launch();

const app = express();
app.listen(3000, ()=>console.log('started'));