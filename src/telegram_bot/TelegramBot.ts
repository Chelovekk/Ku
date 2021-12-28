import {TelegramBotInterface} from "./telegram.interface";
import {Context, Telegraf} from "telegraf";
import {RequestData} from "../Request/Request";
import {OpenweatherData} from "../Request/Request.interface";
import dotenv from "dotenv";
dotenv.config()

export class TelegramBot implements TelegramBotInterface{
    bot: Telegraf = new Telegraf(process.env.TG_TOKEN!);

    constructor() {
        this.startSendData();
        this.addStartListener();
        this.addTextListener();
    }

    addStartListener(): void {
        this.bot.start(async (ctx: Context) => {
            await ctx.reply('Welcome');
        });
    }

    addTextListener(): void {
        this.bot.on("text", async (ctx: Context) => {
            const data: OpenweatherData | undefined  = await new RequestData().getWeatherData();
            await ctx.reply(await new RequestData().createSendingData(data!));
        });
    }
    async startSendData(): Promise<void> {
        const data: OpenweatherData | undefined  = await new RequestData().getWeatherData();
        await this.bot.telegram.sendMessage(process.env.TG_CHANNEL_ID!, await new RequestData().createSendingData(data!));
    }
}