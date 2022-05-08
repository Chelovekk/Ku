import {TelegramBotInterface} from "./telegram.interface";
import {Context, Markup, Telegraf} from "telegraf";
import {RequestData} from "../openweather/Request";
import {OpenWeatherCityData, OpenweatherData} from "../openweather/Request.interface";
import {Users} from "../../models/users";
import {Cities} from "../../models/cities";
import {Users_cities} from "../../models/users_cities";

import {City_weather_data} from "../../models/city_weather_data";
import Stripe from 'stripe';
import env from "../../constants/env";
import {BilingsData} from "../../models/biling_data";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});


export class TelegramBot implements TelegramBotInterface {

    bot: Telegraf = new Telegraf(env.TG_TOKEN);

    // stripe: Stripe = new Stripe.Stripe(process.env.STRIPE_SECRET_KEY)

    constructor() {
        this.addMiddlewares();
        this.addStartListener();
        this.addTextListener();
        this.addNewCityCommandListener();
        this.addListCommandListener();
    }

    addMiddlewares(): void {
        this.bot.use(async (ctx, next) => {

            if (!ctx.chat) {
                (ctx as any).middlewareError = 'Cant find you'
                return await next()
            }
            const user = await Users.findOne({
                where: {
                    messenger_id: ctx.chat!.id
                },
                include: [
                    {
                        model: BilingsData
                    }
                ]
            })
            if (!user) {
                (ctx as any).middlewareError = 'Cant find you'
                return await next();
            }
            if (user.billingData && !user.billingData.billings_period_end || !user.billingData) {
                (ctx as any).middlewareError = 'you havent subscription or you billings period end';
                return next();
            }
            return await next()
        })
    }

    addStartListener(): void {
        this.bot.start(async (ctx: Context) => {
            const telegramId = ctx.chat;
            console.log(telegramId)
            const user = await Users.findOrCreate({
                where: {
                    user_type: "telegram_user",
                    messenger_id: ctx.chat!.id
                },
                include: [{
                    model: BilingsData
                }]
            })

            const paymentLink = await stripe.paymentLinks.create({
                line_items: [
                    {
                        price: env.PRODUCT_DEFAULT_PRICE,
                        quantity: 1
                    },
                ],
                metadata: {
                    telegramId: user[0].messenger_id,
                },
                after_completion: {
                    type: 'redirect',
                    redirect: {
                        url: "https://t.me/log_journal_bot"
                    }
                },
                subscription_data: {
                    trial_period_days: 7
                }
            })

            await ctx.reply(`Welcome, you can use your free-trial to choose your first city for saving statistic, using this link: ${paymentLink.url}`,
                Markup.keyboard(
                    [
                        Markup.button.url("My info", paymentLink.url),
                        `Show my cities`, 'get statistic'],
                    {
                        wrap: (btn, index, currentRow) => currentRow.length >= 2
                    }
                ).resize()
            );
        });
    }

    addTextListener(): void {
        this.bot.on('text', async (ctx) => {
            if (!(await this.middlwareChecking(ctx))) return;

            const data: OpenweatherData | undefined = await new RequestData().getWeatherData();
            await ctx.reply(await new RequestData().createSendingData(data!));
        });
    }

    async startSendData(): Promise<void> {

        const cities = await Cities.findAll({
            include: {
                model: Users
            }
        });

        for (const city of cities) {
            const cityWeatherData: OpenWeatherCityData = await new RequestData().getCityWeatherData(city.city_name) as OpenWeatherCityData;

            await City_weather_data.create({
                temp: cityWeatherData.main.temp,
                speed: cityWeatherData.wind.speed,
                humidity: cityWeatherData.main.humidity,
                feels_like: cityWeatherData.main.feels_like,
                city_id: city.id
            })
            console.log('sending')

            for (const user of city.users) {
                const replyData: string = await new RequestData().cityWeatherDataFormat(cityWeatherData, city.city_name) as unknown as string;
                await this.bot.telegram.sendMessage(user.messenger_id, replyData);
            }
        }
    }

    addNewCityCommandListener() {
        this.bot.command("add", async (ctx) => {
            try {
                const userId = ctx.update.message.from.id;
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
                }, {
                    ignoreDuplicates: true
                })
                await ctx.reply('New cities added')
            } catch (error) {
                console.log(error)
                await ctx.reply("Error in city names")
            }
        })
    }

    addListCommandListener() {
        this.bot.command('list', async (ctx) => {
            try {

                const userCities = await Users.findOne({
                    where: {
                        messenger_id: ctx.update.message.from.id
                    },
                    include: [{
                        model: Cities
                    }]
                })

                let replyString: string = '';
                for (const city of userCities!.cities) {
                    replyString += `${city.city_name} \n`
                }
                await ctx.reply(replyString);
            } catch (error) {
                ctx.reply('Error')
            }
        })
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

                if (!city_user) throw new Error('City absent')

                await Users_cities.destroy({
                    where: {
                        user_id: city_user?.users[0]?.id,
                        city_id: city_user?.id
                    }
                })

                await ctx.reply('city deleted')
            } catch (error) {
                ctx.reply("Error")
            }
        })
    }

    async middlwareChecking(ctx: Context): Promise<boolean> {
        console.log('checking')
        if ((ctx as any).middlewareError) {
            console.log((ctx as any).middlewareError)
            await ctx.reply((ctx as any).middlewareError)
            return false
        }
        return true
    }

}