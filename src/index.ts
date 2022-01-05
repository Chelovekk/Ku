import { TelegramBot } from "./telegram_bot/TelegramBot";
import {DiscordBot} from "./discord_bot/DiscordBot";
import dotenv from 'dotenv';
import express from 'express';
const db  = require("./models/index")
dotenv.config();



const tgBot = new TelegramBot();
const dsBot = new DiscordBot();

dsBot.bot.login(process.env.DISCORD_BOT_TOKEN);
tgBot.bot.launch();

const app = express();
app.listen(3000, ()=>console.log('started'));