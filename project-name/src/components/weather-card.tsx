import React from 'react';
import { CityData } from './city-list-item.tsx';
import { fetchCityWeather, WeatherData } from './weatherApi.tsx';


const getWeatherIcon = (description: string) => {
    switch (description) {
        case 'Clear':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl icon-large sun">clear_day</span>;
        case 'Clouds':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl icon-large cloud">cloud</span>;
        case 'Rain':
        case 'Dizzle':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl icon-large rain">rainy</span>;
        case 'Thunderstorm':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl icon-large">thunderstorm</span>;
        case 'Snow':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl icon-large">weather_snowy</span>;
        case 'Atmosphere':
        case 'Mist':
        case 'Fog':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl icon-large">foggy</span>;
        default:
            return '❓';
    }
};

interface WeatherDashboardProps {
  city: CityData;
}


const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ city }) => {
const emoji = getWeatherIcon(city.description);
const currentMin = city.forecast[0] ? city.forecast[0].tempMin : city.temp;
const displayedMin = Math.min(city.temp, currentMin);
  return (
    <div className="weather-dashboard">
      
        <div className="weather-card">
          
            <div className="current-weather">
                <div className="icon-large">
                    {emoji} 
                </div>
              
                <div className="temperature-container">
                    <span className="temperature">{city.temp}°C</span>
                </div>
          </div>
          
            <p className="description-temp">Current temperature in {city.name}.</p>
          
            <div className="details-row">
                <span className="detail-item">Max temp: {city.forecast && city.forecast[0] ? `${city.forecast[0].tempMax}°C` : '--'}</span>
                <span className="detail-item">Min temp: {displayedMin}°C</span>
            </div>

      </div>
    </div>
  );
};

export default WeatherDashboard;
