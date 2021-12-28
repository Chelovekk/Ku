import {Telegraf} from "telegraf";

export  interface TelegramBotInterface{
        bot: Telegraf;

        addTextListener(): void;
        addStartListener():void;
        startSendData():void;
}

