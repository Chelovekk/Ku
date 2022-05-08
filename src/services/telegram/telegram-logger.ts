import env from "../../constants/env";
import {mainLogger} from "../../Logger";
import {Telegraf} from "telegraf";

const BOT_TOKEN = env.TG_TOKEN;
const GROUP_ID = env.TG_GROUP_ID;

if (!BOT_TOKEN) {
    throw new Error('No telegram bot api key provided');
}

if (!GROUP_ID) {
    throw new Error('No group id provided');
}

const ENV = process.env.NODE_ENV;
const PROJECT = 'MyProject'
const bot = new Telegraf(BOT_TOKEN);

export async function sendTelegramMessage(LEVEL = 'INFO', MSG: string, data?: any, groupId?: string) {
    try {
        const message = '' +
            '<i>Project</i>: #' + PROJECT + '\n' +
            '<i>Log</i>: #' + LEVEL + '\n' +
            '<i>Env</i>: #' + ENV + '\n' +
            '<b>' + MSG + '</b>';
        if (data) {
            const buffer = Buffer.from(JSON.stringify(data, null, 2), 'utf-8');
            await bot.telegram.sendDocument(GROUP_ID, {source: buffer});
        } else {
            await bot.telegram.sendMessage(groupId || GROUP_ID, message, {
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            mainLogger.error({message: `Can not send message. Error: ${error.message}`})
        }
    }
}