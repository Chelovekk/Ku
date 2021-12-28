import {Client} from "discord.js";

export interface DiscordBotInterface{
    bot: Client;
    prefix: string;

    addPrefixCommandsListener(): void;
    startSendData(): void;
}

