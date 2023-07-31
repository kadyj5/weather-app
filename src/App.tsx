import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Routes and Route
import { WeatherData } from './WeatherData';
import DetailsScreen from './DetailsScreen';

import {
    Typography,
    Container,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';
import WeatherForecast from './WeatherForecast';


const API_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=50.0614&longitude=19.9366&hourly=temperature_2m,precipitation&daily=apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin&forecast_days=3';

const App = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [selectedDayHourlyData, setSelectedDayHourlyData] = useState<number[] | null>(null);

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

    const handleMoreDetailsClick = (index: number) => {
        if (weatherData) {
            const selectedDay = weatherData.daily.time[index];
            const filteredHourlyData = weatherData.hourly.time.reduce((acc: number[], time: string, i: number) => {
                if (time.startsWith(selectedDay)) {
                    acc.push(weatherData.hourly.temperature_2m[i]);
                }
                return acc;
            }, []);
            setSelectedDayHourlyData(filteredHourlyData);
        }
    };

    return (
            <Container maxWidth="sm">
                <Routes><Route path={'/'} element={
                    <Box mt={6} sx={{backgroundColor: '#9BCDD2', padding: '16px', borderRadius: '8px'}}>
                        <Typography variant="h2" gutterBottom>
                            Weather App
                        </Typography>
                        {weatherData && <WeatherForecast weatherData={weatherData} handleMoreDetailsClick={handleMoreDetailsClick}/>}
                    </Box>
                }></Route>
                    <Route path="/details/:index" element={<DetailsScreen weatherData={weatherData} selectedDayHourlyData={selectedDayHourlyData} />} />
                </Routes>
            </Container>
    );
};

export default App;
