import {mainLogger} from "../Logger";
import {sendTelegramMessage} from "../services/telegram/telegram-logger";
import {Telegraf} from "telegraf";

export default class Logger {

    constructor() {

    }

    static async logException(error: unknown, message: string, data?: unknown) {
        console.dir(error);
        Logger.logError(error instanceof Error ? `${message} Error message: ${error.message}.` : message, data);
    }

    static async logError(message: string, data?: unknown) {
        mainLogger.error({message, data});
        await sendTelegramMessage( 'ERROR', message, data);
    }

    static async logInfo(message: string, data?: unknown) {
        mainLogger.info({message, data});
    }

    static async logInfoWithTelegram(message: string, data?: unknown) {
        mainLogger.info({message, data});
        await sendTelegramMessage('INFO', message, data);
    }

    static async logInfoWithTelegramCustomGroup(message: string, data?: unknown, groupId?: string) {
        mainLogger.info({message, data});

        if (groupId) {
            await sendTelegramMessage('INFO', message, data, groupId);
        }
    }
}