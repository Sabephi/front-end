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

const getWeatherIcon = (iconName: CityData['icon']) => {
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

export const CityListItem: React.FC<CityListItemProps> = ({ city, onClick }) => {
  return (
    <div onClick={() => onClick(city.id)}>
      <div>{getWeatherIcon(city.icon)} {city.name} </div><div>{city.temp}°C</div>
    </div>
  );
};

export default CityListItem;