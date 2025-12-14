import React from 'react';

export interface CityData {
  id: number;
  name: string;
  temp: number;
  icon: 'sun' | 'cloud' | 'rain';
  isActive: boolean;
}

interface CityListItemProps {
  city: CityData;
  onClick: (id: number) => void; 
}

const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
        case 'sun':
            return <span class="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl sun pr">light_mode</span>;
        case 'cloud':
            return <span class="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl cloud pr">cloud</span>;
        case 'rain':
            return <span class="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary text-2xl rain pr">rainy</span>;
        case 'partly_cloud':
            return <span class="material-symbols-outlined text-gray-400 text-2xl w-1/4 text-center partly_cloud pr">partly_cloudy_day</span>;
        default:
            return '❓';
    }
};

export const CityListItem: React.FC<CityListItemProps> = ({ city, onClick }) => {
  return (
    <div className="city-list-item" onClick={() => onClick(city.id)}>
      <div className="city-list-item-left">{getWeatherIcon(city.icon)} {"   "}{city.name} </div><div className="city-list-item-right">{city.temp}°C</div>
    </div>
  );
};

export default CityListItem;