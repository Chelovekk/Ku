import {OpenWeatherCityData, OpenweatherData, RequestDataInterface} from "./Request.interface";
import axios from "axios";

export class RequestData implements RequestDataInterface {
    async getWeatherData(): Promise<OpenweatherData | undefined> {
        try {
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=33.34&lon=-94.04&exclude=hourly,daily&appid=${process.env.API_KEY}`;

            const {data} = await axios.get<OpenweatherData>(url);

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async createSendingData(data: OpenweatherData): Promise<string> {
        const lat: string = data.lat.toString();
        const lon: string = data.lon.toString();
        const time_zone: string = data.timezone.toString();
        const timezone_offset: string = data.timezone_offset.toString();

        const sendingData = `lat: ${lat} \n lon: ${lon}\n time_zone: ${time_zone}\n timezone_offset: ${timezone_offset}`

        return sendingData;
    }

    cityWeatherDataFormat(data: OpenWeatherCityData, city_name: string): string {
        return `${city_name} \n` +
            `Wind speed: ${data.wind.speed} \n ` +
            `Temperature: ${data.main.temp - 273} \n` +
            `Feels like: ${data.main.feels_like - 273} \n` +
            `Humidity: ${data.main.humidity}`
    }

    async getCityWeatherData(cityName: string): Promise<OpenWeatherCityData> {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`;
        const {data} = await axios.get<OpenWeatherCityData>(url);
        return data;
    }

    async getCityExistingStatus(cityName: string): Promise<boolean> {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`
        const city = await axios.get(url);
        if (city) return true
        return false
    }
}