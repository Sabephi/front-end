import React from 'react';
import { fetchCityWeather, WeatherData } from './weatherApi.tsx';


const getWeatherIcon = (description: string) => {
    switch (description) {
        case 'Clear':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl sun">clear_day</span>;
        case 'Clouds':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl cloud">cloud</span>;
        case 'Rain':
        case 'Dizzle':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl rain">rainy</span>;
        case 'Thunderstorm':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl">thunderstorm</span>;
        case 'Snow':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl">weather_snowy</span>;
        case 'Atmosphere':
        case 'Mist':
        case 'Fog':
            return <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl">foggy</span>;
        default:
            return '❓';
    }
};

export const CityListItem: React.FC<CityListItemProps> = ({ city, onClick }) => {
  const emoji = getWeatherIcon(city.description);
  return (
    <div className="city-list-item" onClick={() => onClick(city.id)}>
        <div className="city-list-item-left">{getWeatherIcon(city.description)} {city.name} </div><div className="city-list-item-right">{city.temp}°C</div>
    </div>
  );
};

export default CityListItem;