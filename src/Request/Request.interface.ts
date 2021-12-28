export interface OpenweatherData {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
}
export interface RequestDataInterface {
    getWeatherData(): Promise<OpenweatherData | undefined>;
    createSendingData(data:OpenweatherData): Promise<string>;
}
