import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {Box, Button, Typography } from '@mui/material';
import { WeatherData } from './WeatherData';

interface DetailsScreenProps {
    weatherData: WeatherData | null;
    selectedDayHourlyData: number[] | null;
}

const DetailsScreen = ({ weatherData, selectedDayHourlyData }: DetailsScreenProps) => {
    const { index } = useParams<{ index: string }>();
    const selectedDayIndex = parseInt(index || '', 10);
    const navigate = useNavigate(); // Use useNavigate here

    if (!weatherData || isNaN(selectedDayIndex) || selectedDayIndex < 0 || selectedDayIndex >= weatherData.daily.time.length) {
        return <div>No data available.</div>;
    }

    const selectedDay = weatherData.daily.time[selectedDayIndex];
    const hourlyData = selectedDayHourlyData || [];

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div>
            <Box mt={6} sx={{backgroundColor: '#9BCDD2', padding: '16px', borderRadius: '8px'}}>
            <Link to="/" style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                <Button variant="contained" color="primary" onClick={handleGoBack}>
                    Home
                </Button>
            </Link>

            <Typography variant="h4" component="h2" mt={4}>
                Hourly Data for {selectedDay}
            </Typography>
            {hourlyData.length > 0 ? (
                hourlyData.map((temperature: number, index: number) => (
                    <div key={index}>
                        <Typography variant="body2" color="textSecondary">
                            Hour: {index}:00 - Temperature: {temperature}°C
                        </Typography>
                    </div>
                ))
            ) : (
                <div>No hourly data available for this day.</div>
            )}
            </Box>
        </div>
    );
};

export default DetailsScreen;
