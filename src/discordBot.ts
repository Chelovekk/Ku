import {DiscordBot} from "./discord_bot/DiscordBot";
import env from "./constants/env";

const dsBot = new DiscordBot();

dsBot.bot.login(env.DISCORD_BOT_TOKEN);
