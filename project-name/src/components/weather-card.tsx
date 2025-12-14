import React from 'react';
import { CityData } from './city-list-item.tsx';

const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
        case 'sun':
            return <span class="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl icon-large sun">light_mode</span>;
        case 'cloud':
            return <span class="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl icon-large cloud">cloud</span>;
        case 'rain':
            return <span class="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl icon-large rain">rainy</span>;
        case 'partly_cloud':
            return <span class="material-symbols-outlined text-gray-400 text-2xl w-1/4 text-center icon-large partly_cloud">partly_cloudy_day</span>;
        default:
            return '❓';
    }
};

interface WeatherDashboardProps {
  city: CityData;
}


const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ city }) => {
  const emoji = getWeatherIcon(city.icon);

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
              <span className="detail-item">Max temp: -</span>
              <span className="detail-item">Min temp: -</span>
          </div>

      </div>
    </div>
  );
};

export default WeatherDashboard;
