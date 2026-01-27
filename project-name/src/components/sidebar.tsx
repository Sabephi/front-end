import React, { ReactNode } from 'react';
import CityList from './city-list.tsx';
import { CityData } from './city-list-item.tsx';

interface SidebarProps {
  cities: CityData[];
  onCitySelect: (id: number) => void;
  children: ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ cities, onCitySelect, children, className }) => {
  return (
    <aside className={`app-sidebar-container ${className}`}>
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