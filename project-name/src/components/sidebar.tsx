import React, { ReactNode } from 'react';
import CityList from './city-list.tsx';
import { CityData } from './city-list-item.tsx';

interface SidebarProps {
  cities: CityData[];
  onCitySelect: (id: number) => void;
  children: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children, cities, onCitySelect }) => { 
  return (
    <aside className="app-sidebar-container">
      <div style={{ marginBottom: '20px' }}>
        {children}
      </div>
      
      <CityList 
          cities={cities}
          onCitySelect={onCitySelect}
      />
      
      <button className="add-city-button">
          Add City
      </button>
    </aside>
  );
};

export default Sidebar;