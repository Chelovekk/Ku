import Discord, {Client, Message, TextChannel} from "discord.js";
import { DiscordBotInterface } from "./DiscordBotInterface";
import { RequestData } from "../Request/Request";
import { OpenweatherData } from "../Request/Request.interface";

const intents = [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.GUILD_PRESENCES
];

export class DiscordBot implements DiscordBotInterface {
    bot: Client = new Discord.Client({ intents, partials: ['MESSAGE', 'CHANNEL']});
    prefix: string = '-';
    constructor() {
        this.startSendData();
        this.addPrefixCommandsListener();
    }
    addPrefixCommandsListener() {
        this.bot.on("messageCreate", async (message: Message) => {
            if(!message.content.startsWith(this.prefix)) return;

            const content: string = message.content.toLowerCase().substring(1);
            switch (content) {
                case 'data':
                    const data: OpenweatherData | undefined = await new RequestData().getWeatherData();
                    await message.reply(await new RequestData().createSendingData(data!));
            }
        });
    }
    startSendData() {

        this.bot.once('ready', async () => {
            const data: OpenweatherData|undefined  = await new RequestData().getWeatherData() as OpenweatherData;
            // const channel: TextChannel = <TextChannel>this.bot.channels.cache.get(process.env.DISCORD_TEXT_CHANNEL_ID!);
            const channel = await this.bot.channels.fetch(process.env.DISCORD_TEXT_CHANNEL_ID!);
            if(channel instanceof TextChannel) {
                await channel.send(await new RequestData().createSendingData(data!));
            } else {
                throw new Error('Invalid channel type.');
            }
        });
    }
}