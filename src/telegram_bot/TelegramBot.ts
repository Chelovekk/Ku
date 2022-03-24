import { TelegramBotInterface } from "./telegram.interface";
import { Telegraf } from "telegraf";
import { RequestData } from "../Request/Request";
import {OpenWeatherCityData, OpenweatherData} from "../Request/Request.interface";
import dotenv from "dotenv";
import { Users } from "../models/users";
import {Cities} from "../models/cities";
import {Users_cities} from "../models/users_cities";
import {City_weather_data} from "../models/city_weather_data";
dotenv.config()

export class TelegramBot implements TelegramBotInterface{

    bot: Telegraf = new Telegraf(process.env.TG_TOKEN!);

    constructor() {
        this.startSendData();
        this.addStartListener();
        this.addNewCityCommandListener();
        this.addListCommandListener();
        this.addDeleteListener();
    }

    addStartListener(): void {
        this.bot.start(async (ctx) => {
            await Users.create({
                user_type: "telegram_user",
                messenger_id: ctx.update.message.from.id
            })
            await ctx.reply('Welcome');
        });
    }

    addTextListener(): void {
        this.bot.on("text", async (ctx) => {
            // console.log(ctx)
            const data: OpenweatherData | undefined  = await new RequestData().getWeatherData();
            await ctx.reply(await new RequestData().createSendingData(data!));
        });
    }

    async startSendData(): Promise<void>{

        const cities = await Cities.findAll({
            include: {
                model:Users
            }
        });

        for(const city of cities){
            const cityWeatherData: OpenWeatherCityData = await new RequestData().getCityWeatherData(city.city_name) as OpenWeatherCityData;

            await City_weather_data.create({
                temp: cityWeatherData.main.temp,
                speed: cityWeatherData.wind.speed,
                humidity: cityWeatherData.main.humidity,
                feels_like: cityWeatherData.main.feels_like,
                city_id: city.id
            })

            for(const user of city.users){
                const replyData: string = await new RequestData().cityWeatherDataFormat(cityWeatherData, city.city_name) as unknown as string;
                await this.bot.telegram.sendMessage(user.messenger_id, replyData);
            }
        }
    }

    addNewCityCommandListener(){
        this.bot.command("add", async (ctx) => {
            try {
                const userId: string = ctx.update.message.from.id as string;
                const newCity = ctx.update.message.text.split(' ')[1].toLowerCase();
                const cityExist = await new RequestData().getCityExistingStatus(newCity);

                if (!cityExist) throw new Error('City not exist')

                const city = await Cities.findOrCreate({
                    where: {
                        city_name: newCity
                    }
                })

                 const user = await Users.findOne({
                    where: {
                        user_type: 'telegram_user',
                        messenger_id: userId!
                    },

                })

                await Users_cities.create({
                    user_id: user?.id!,//!?
                    city_id: city[0].id
                },{
                    ignoreDuplicates: true
                })
                await ctx.reply('New cities added')
            }
            catch (error){
                console.log(error)
                await ctx.reply("Error in city names")
            }
        })
    }

    addListCommandListener(){
        this.bot.command('list', async (ctx) => {
            try{

                const userCities = await Users.findOne({
                    where: {
                        messenger_id: ctx.update.message.from.id
                    },
                    include: [{
                        model:Cities
                    }]
                })

                let replyString: string = '';
                for (const city of userCities!.cities){
                    replyString += `${city.city_name} \n`
                }
                await ctx.reply(replyString);
        }
        catch (error) {
            ctx.reply('Error')
        }
    })
    }

    addDeleteListener(){
            this.bot.command('delete', async (ctx) => {
                try {
                    const userId = ctx.update.message.from.id;
                    const cityForDeliting = ctx.update.message.text.split(' ')[1];

                    const city_user = await Cities.findOne({
                        where: {
                            city_name: cityForDeliting
                        },
                        include: {
                            model: Users,
                            where: {
                                messenger_id: userId
                            }
                        }
                    })

                    if(!city_user) throw new Error('City absent')

                    await Users_cities.destroy({
                        where: {
                            user_id: city_user?.users[0]?.id,
                            city_id: city_user?.id
                        }
                    })

                    await ctx.reply('city deleted')
                }
                catch (error){
                    ctx.reply("Error")
                }
            })
    }

}