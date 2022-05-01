import {TelegramBot} from "./telegram_bot/TelegramBot";
const db = require("./models/index")

const tgBot = new TelegramBot();

tgBot.bot.launch();
