import React from 'react';
import type { CityData } from './city-list-item.tsx'; 


interface ForecastDay {
    day: string; 
    icon: CityData['icon']; 
    lowTemp: number;
    highTemp: number;
    currentTemp: number;
}

const dummyForecastData: ForecastDay[] = [
    { day: "Tuesday", icon: 'rain', lowTemp: 15, highTemp: 20, currentTemp: 19 },
    { day: "Wednesday", icon: 'cloud', lowTemp: 14, highTemp: 18, currentTemp: 17 },
    { day: "Thursday", icon: 'sun', lowTemp: 16, highTemp: 23, currentTemp: 22 },
    { day: "Friday", icon: 'sun', lowTemp: 17, highTemp: 24, currentTemp: 23 },
    { day: "Saturday", icon: 'sun', lowTemp: 18, highTemp: 25, currentTemp: 24 },
];

const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
        case 'sun':
            return <span class="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl sun">light_mode</span>;
        case 'cloud':
            return <span class="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl cloud">cloud</span>;
        case 'rain':
            return <span class="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl rain">rainy</span>;
        case 'partly_cloud':
            return <span class="material-symbols-outlined text-gray-400 text-2xl w-1/4 text-center partly_cloud">partly_cloudy_day</span>;
        default:
            return '❓';
    }
};



const ForecastRow: React.FC<{ data: ForecastDay }> = ({ data }) => {
    const iconEmoji = getWeatherIcon(data.icon);
    
    return (
        <div className="forecast-row">
            <span className="forecast-day">{data.day}</span>
            <span className="forecast-icon">{iconEmoji}</span>
            <span className="forecast-min-max">{data.lowTemp}° / {data.highTemp}°</span>
            <span className="forecast-current-temp">{data.currentTemp}°C</span>
        </div>
    );
};


const WeatherForecast: React.FC = () => {
    return (
            <div className="forecast-list">
                {dummyForecastData.map((day, index) => (
                    <ForecastRow key={index} data={day} />
                ))}
            </div>
    );
};

export default WeatherForecast;