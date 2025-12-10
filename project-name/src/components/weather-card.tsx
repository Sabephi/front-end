import React from 'react';
import { CityData } from './city-list-item.tsx';

const getWeatherIcon = (iconName: 'sun' | 'cloud' | 'rain' | string) => {
    switch (iconName) {
        case 'sun':
            return '☀️';
        case 'cloud':
            return '☁️';
        case 'rain':
            return '🌧️';
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
