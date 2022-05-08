import {TelegramBot} from "./services/telegram/TelegramBot";
const db = require("./models/index")

const tgBot = new TelegramBot();

tgBot.bot.launch();
