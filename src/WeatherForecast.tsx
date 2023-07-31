import React from 'react';
import { Link } from 'react-router-dom';
import { WeatherData } from './WeatherData';
import { Typography, Card, CardContent, CardActions, Button } from '@mui/material';

interface WeatherForecastProps {
    weatherData: WeatherData;
    handleMoreDetailsClick: (index: number) => void;
}

const WeatherForecast = ({ weatherData, handleMoreDetailsClick }: WeatherForecastProps) => {
    return (
        <div>
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

            {weatherData.daily && (
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
        </div>
    );
};

export default WeatherForecast;
