import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Typography, Container, Box, Card, CardContent, CardActions, Button} from '@mui/material';

const API_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=50.0625&longitude=19.9375&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin&forecast_days=3';

interface WeatherData {
    current_weather: {
        temperature: number;
        windspeed: number;
        winddirection: number;
        is_day: number;
        time: string;
    };
    daily: {
        time: string[];
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
            <Box mt={6} sx={{ backgroundColor: '#9BCDD2', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="h2" gutterBottom>
                    Weather App
                </Typography>
                {weatherData && (
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Today's Weather
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Time: {weatherData.current_weather.time}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Temperature: {weatherData.current_weather.temperature}°C
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Wind speed: {weatherData.current_weather.windspeed}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Wind direction: {weatherData.current_weather.winddirection}
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                {weatherData?.daily && (
                    <div>
                        <Typography variant="h5" component="h2" mt={4}>
                            Weather Forecast
                        </Typography>
                        {weatherData.daily.temperature_2m_max.map((temperature, index) => (
                            <Card key={index} variant="outlined">
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary">
                                        Date: {weatherData.daily.time[index]}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Max Temperature: {temperature}°C
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Min Temperature: {weatherData.daily.temperature_2m_min[index]}°C
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Sunrise: {weatherData.daily.sunrise[index]}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Sunset: {weatherData.daily.sunset[index]}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">More details</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                )}
            </Box>
        </Container>
    );
};

export default App;
