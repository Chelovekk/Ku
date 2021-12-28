import {OpenweatherData, RequestDataInterface} from "./Request.interface";
import axios from "axios";

export class RequestData implements RequestDataInterface{
     async getWeatherData (): Promise<OpenweatherData | undefined> {
        try {
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=33.34&lon=-94.04&exclude=hourly,daily&appid=${process.env.API_KEY}`;
            const {data}  = await axios.get<OpenweatherData>(url) ;

            return data;
        } catch (error) {
            console.log(error);
        }
    }
    async createSendingData(data:OpenweatherData): Promise<string> {
        const lat: string = data.lat.toString();
        const lon: string = data.lon.toString();
        const time_zone: string = data.timezone.toString();
        const timezone_offset: string = data.timezone_offset.toString();

        const sendingData = `lat: ${lat} \n lon: ${lon}\n time_zone: ${time_zone}\n timezone_offset: ${timezone_offset}`

        return sendingData;
    }
}