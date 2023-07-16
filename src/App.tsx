import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Box } from '@mui/material';

const API_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=50.0625&longitude=19.9375&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin&forecast_days=3';

interface WeatherData {
    current_weather: {
        temperature: number;
        windspeed: number;
        winddirection: number;
        is_day: number
        time: string
    };
    daily: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        sunrise: string[];
        sunset: string[];
    };
}

const App: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<WeatherData>(API_URL);
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Weather App
                </Typography>
                {weatherData && (
                    <div>
                        <h2>Today's Weather</h2>
                        <p>Time: {weatherData.current_weather.time}</p>
                        <p>Max Temperature: {weatherData.current_weather.temperature}°C</p>
                        <p>Wind speed: {weatherData.current_weather.windspeed}</p>
                        <p>Wind direction: {weatherData.current_weather.winddirection}</p>
                    </div>
                )}

                {weatherData?.daily && (
                    <div>
                        <h2>Weather Forecast</h2>
                        {weatherData.daily.temperature_2m_max.map((temperature, index) => (
                            <div key={index}>
                                <p>Date: {index + 1}</p>
                                <p>Max Temperature: {temperature}°C</p>
                                <p>Min Temperature: {weatherData.daily.temperature_2m_min[index]}°C</p>
                                <p>Sunrise: {weatherData.daily.sunrise[index]}</p>
                                <p>Sunset: {weatherData.daily.sunset[index]}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Box>
        </Container>
    );
};

export default App;
