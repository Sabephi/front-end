import React from 'react';
import { DailyForecast } from '../weatherApi.tsx';

interface WeatherForecastProps {
    forecast: DailyForecast[];
}

const getWeatherIcon = (description: string) => {
    const key = description ? description.toLowerCase().trim() : '';
    const defaultClasses = "material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl";

    switch (key) {
        case 'clear':
            return <span className={`${defaultClasses} sun`}>light_mode</span>;
        case 'clouds':
            return <span className={`${defaultClasses} cloud`}>cloud</span>;
        case 'rain':
        case 'drizzle':
            return <span className={`${defaultClasses} rain`}>rainy</span>;
        case 'thunderstorm':
            return <span className={`${defaultClasses} thunderstorm`}>thunderstorm</span>;
        case 'snow':
            return <span className={`${defaultClasses} snow`}>ac_unit</span>;
        case 'mist':
        case 'fog':
        case 'haze':
            return <span className={`${defaultClasses} fog`}>foggy</span>;
        default:
            return <span className={defaultClasses}>help</span>;
    }
};


const formatDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const ForecastRow: React.FC<{ dayData: DailyForecast }> = ({ dayData }) => {
    const icon = getWeatherIcon(dayData.description);
    return (
        <div className="forecast-row">
            <span className="forecast-day">{formatDayName(dayData.date)}</span>
            <span className="forecast-icon">{icon}</span>
            
            <div className="forecast-temp-range">
                <span className="forecast-min">{Math.round(dayData.tempMin)}°</span>
                <span className="forecast-divider">/</span>
                <span className="forecast-max">{Math.round(dayData.tempMax)}°</span>
            </div>
        </div>
    );
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
    console.log("Dane prognozy w komponencie:", forecast);
    
    if (!forecast || forecast.length === 0) {
        return <div className="forecast-loading">Loading 5-day forecast...</div>;
    }
    return (
        <div className="forecast-container">
            <h3 className="forecast-title">5-Day Forecast</h3>
            <div className="forecast-list">
                {forecast.map((day, index) => (
                    <ForecastRow key={index} dayData={day} />
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;