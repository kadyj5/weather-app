export interface WeatherData {
    current_weather: {
        temperature: number;
        windspeed: number;
        winddirection: number;
        is_day: number;
        time: string;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        precipitation: number[];
    };
    daily: {
        time: string[];
        apparent_temperature_max: number[];
        apparent_temperature_min: number[];
        sunrise: string[];
        sunset: string[];
    };
}