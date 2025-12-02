 import React from 'react';

 export interface CityData {
  id: number;
  name: string;
  temp: number;
  icon: string; // np. "sun", "cloud", "rain"
  isActive: boolean;
}

interface CityListItemProps {
  city: CityData;
  onClick: (id: number) => void; // Funkcja do obsługi kliknięcia
}

const getIcon = (iconName: string): string => {
    switch (iconName) {
        case 'sun': return '☀️'; // Słońce (dla Warszawy)
        case 'cloud': return '☁️'; // Chmura (dla Krakowa)
        case 'rain': return '🌧️'; // Deszcz (dla Gdańska)
        default: return '✨';
    }
};

export const CityListItem: React.FC<CityListItemProps> = ({ city, onClick }) => {
  // Klasy CSS dla stylizacji - używamy globalnych klas dla uproszczenia
  const itemClasses = `city-item ${city.isActive ? 'city-item-active' : ''}`;

  return (
    <div className={itemClasses} onClick={() => onClick(city.id)}>
      <div className="city-item-info">
        <span className="city-item-icon">{getIcon(city.icon)}</span>
        <span className="city-item-name">{city.name}</span>
      </div>
      <span className="city-item-temp">{city.temp}°C</span>
    </div>
  );
};

export default CityListItem;