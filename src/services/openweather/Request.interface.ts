interface OpenWeatherMain{
    temp: number,
    feels_like: number,
    humidity: number
}
interface OpenWeatherWind{
    speed: number,
}
export interface OpenWeatherCityData{
    main: OpenWeatherMain,
    wind: OpenWeatherWind,
    // [key:string]: OpenWeatherWind | OpenWeatherMain

}
export interface OpenweatherData {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
}
export interface RequestDataInterface {
    getWeatherData(): Promise<OpenweatherData | undefined>;
    createSendingData(data:OpenweatherData): Promise<string>;
    getCityWeatherData(cityName:string): Promise<OpenWeatherCityData>;
}
