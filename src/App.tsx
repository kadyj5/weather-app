import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import {
    Typography,
    Container,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';

const API_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=50.0614&longitude=19.9366&hourly=temperature_2m,precipitation&daily=apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin&forecast_days=3';

interface WeatherData {
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

const App: React.FC = () => {
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
            const filteredHourlyData = weatherData.hourly.time.reduce((acc: number[], time, i) => {
                if (time.startsWith(selectedDay)) {
                    acc.push(weatherData.hourly.temperature_2m[i]);
                }
                return acc;
            }, []);

            setSelectedDayHourlyData(filteredHourlyData);
        }
    };

    return (
        <Router>
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
                            {weatherData.daily.time.map((date, index) => (
                                <Card key={index} variant="outlined">
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary">
                                            Date: {date}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Max Temperature: {weatherData.daily.apparent_temperature_max[index]}°C
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Min Temperature: {weatherData.daily.apparent_temperature_min[index]}°C
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Sunrise: {weatherData.daily.sunrise[index]}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Sunset: {weatherData.daily.sunset[index]}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={`/details/${index}`}>
                                            <Button size="small" onClick={() => handleMoreDetailsClick(index)}>
                                                More details
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            ))}
                        </div>
                    )}

                    <Routes>
                        <Route
                            path="/details/:index"
                            element={<DetailsScreen weatherData={weatherData} selectedDayHourlyData={selectedDayHourlyData} />}
                        />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
};

interface DetailsScreenProps {
    weatherData: WeatherData | null;
    selectedDayHourlyData: number[] | null;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ weatherData, selectedDayHourlyData }) => {
    const { index } = useParams<{ index: string }>();
    const selectedDayIndex = parseInt(index || '', 10);

    if (!weatherData || selectedDayIndex < 0 || selectedDayIndex >= weatherData.daily.time.length) {
        return <div>No data available.</div>;
    }

    const selectedDay = weatherData.daily.time[selectedDayIndex];
    const hourlyData = selectedDayHourlyData || [];

    return (
        <div>
            <Typography variant="h4" component="h2" mt={4}>
                Hourly Data for {selectedDay}
            </Typography>
            {hourlyData.length > 0 ? (
                hourlyData.map((temperature, index) => (
                    <div key={index}>
                        <Typography variant="body2" color="textSecondary">
                            Hour: {index}:00 - Temperature: {temperature}°C
                        </Typography>
                    </div>
                ))
            ) : (
                <div>No hourly data available for this day.</div>
            )}
        </div>
    );
};

export default App;