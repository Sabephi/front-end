import React from 'react';
import CityListItem, { CityData } from './city-list-item.tsx';

interface CityListProps {
  cities: CityData[]; 
  onCitySelect: (id: number) => void;
}

export const CityList: React.FC<CityListProps> = ({ cities, onCitySelect }) => {
  return (
    <div className="city-list-container">
      {cities.map((city) => ( 
        <CityListItem 
          key={city.id} 
          city={city}
          onClick={onCitySelect} 
        />
      ))}
    </div>
  );
};

export default CityList;