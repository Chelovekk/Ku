import Logger from "./utils/logger";
import delay from "delay";
import {SendNotifications} from "./services/telegram/update_notifications";
import './models/index'
import {Users} from "./models/users";
import {OpenWeatherCityData} from "./services/openweather/Request.interface";
import {RequestData} from "./services/openweather/Request";
import {City_weather_data} from "./models/city_weather_data";
import {Cities} from "./models/cities";


(async () => {
    while (true) {
        try {
            const sendNotifications = new SendNotifications(Logger);
            await sendNotifications.handle()
            await delay(3600000)
        } catch (e) {
            console.log(e)
            await Logger.logException(e, '[SendNotifications]: Failed')
            await delay(3600000);
        }
    }
})();

(async () => {
    while (true) {
        try {
            const ciities = await Cities.findAll();
            for(const city of ciities){
                const cityWeatherData: OpenWeatherCityData = await new RequestData().getCityWeatherData(city.city_name) as OpenWeatherCityData;

                await City_weather_data.create({
                    temp: cityWeatherData.main.temp,
                    speed: cityWeatherData.wind.speed,
                    humidity: cityWeatherData.main.humidity,
                    feels_like: cityWeatherData.main.feels_like,
                    city_id: city.id
                })
            }
            await delay(3600000)
        } catch (e) {
            await Logger.logException(e, '[SendNotifications]: Failed')
            await delay(3600000);
        }
    }
})()