import {Users} from "../../models/users";
import {Cities} from "../../models/cities";
import {City_weather_data} from "../../models/city_weather_data";
import {BilingsData} from "../../models/biling_data";
import {Op} from "sequelize";
import {RequestData} from "../openweather/Request";
import '../../models/index'
import {Telegraf} from "telegraf";
import env from "../../constants/env";
import Logger from "../../utils/logger";

interface UsersMessages {
    sendingMessage: string,
    messengerId: number
}


export class SendNotifications {

    private botInstance:Telegraf;

    constructor(
        private logger: Logger,
    ) {
        this.botInstance = new Telegraf(env.TG_TOKEN);
        this.logger = Logger;
    }

    async handle() {
        console.log(1)
        const users = await Users.findAll({
            where: {},
            include: [
                {
                    model: Cities,
                    required: true,
                    include: [{
                        model: City_weather_data
                    }]
                },
                // {
                //     model: BilingsData,
                //     required:true,
                //     where:{
                //         subscriptionId:{
                //             [Op.ne]:null
                //         }
                //     }
                // }
            ]
        })
        console.log(users)
        const userMessages = await this.generateMessage(users);
        for (const userMassage of userMessages) {
            await this.botInstance.telegram.sendMessage(userMassage.messengerId, userMassage.sendingMessage);
        }
        console.log(4)
    }
    private async generateMessage(users: Users[]): Promise<UsersMessages[]>{
        const cities = await Cities.findAll();
        const preparedWeatherData: { city: string, data: string }[] = [];
        const requestData = new RequestData();
        const usersMessages: UsersMessages[] = [];
        for (const city of cities) {
            const weatherData = await requestData.getCityWeatherData(city.city_name);
            preparedWeatherData.push({
                city: city.city_name,
                data: requestData.cityWeatherDataFormat(weatherData, city.city_name)
            });
        }
        for (const user of users) {
            let sendingMessage: string = '';
            for (const preparedData of preparedWeatherData) {
                sendingMessage += preparedData.data + '\n\n';
            }
            usersMessages.push({sendingMessage, messengerId: user.messenger_id});
        }
        return usersMessages;
    }

}
// export const bootstrapNotifications = async () => {
//     const users = await Users.findAll({
//         where: {},
//         include: [
//             {
//                 model: Cities,
//                 required: true,
//                 include: [{
//                     model: City_weather_data
//                 }]
//             },
//             // {
//             //     model: BilingsData,
//             //     required:true,
//             //     where:{
//             //         subscriptionId:{
//             //             [Op.ne]:null
//             //         }
//             //     }
//             // }
//         ]
//     })
//     const botInstance = new Telegraf(env.TG_TOKEN);
//     await botInstance.launch();
//     const userMessages = await generateMessage(users);
//     for (const userMassage of userMessages) {
//         await botInstance.telegram.sendMessage(userMassage.messengerId, userMassage.sendingMessage);
//     }
//
// }
//
// const sendMessageTo = async () => {
//
// }
// const generateMessage = async (users: Users[]): Promise<UsersMessages[]> => {
//     const cities = await Cities.findAll();
//     const preparedWeatherData: { city: string, data: string }[] = [];
//     const requestData = new RequestData();
//     const usersMessages: UsersMessages[] = [];
//     for (const city of cities) {
//         const weatherData = await requestData.getCityWeatherData(city.city_name);
//         preparedWeatherData.push({
//             city: city.city_name,
//             data: requestData.cityWeatherDataFormat(weatherData, city.city_name)
//         });
//     }
//     for (const user of users) {
//         let sendingMessage: string = '';
//         for (const preparedData of preparedWeatherData) {
//             sendingMessage += preparedData.data + '\n\n';
//         }
//         usersMessages.push({sendingMessage, messengerId: user.messenger_id});
//     }
//     return usersMessages;
// }
