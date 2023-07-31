import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import DetailsScreen from "./DetailsScreen";
import { WeatherData } from './WeatherData';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);



reportWebVitals();
