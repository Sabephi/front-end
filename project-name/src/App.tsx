import './App.css'
import Sidebar from './components/sidebar.tsx';
import { CityData } from './components/city-list-item.tsx';
import React, { useState } from 'react';

const initialCities: any[] = [ 
    { id: 1, name: 'Warsaw', temp: 18, icon: 'sun', isActive: true },
    { id: 2, name: 'Kraków', temp: 16, icon: 'cloud', isActive: false },
    { id: 3, name: 'Gdańsk', temp: 14, icon: 'rain', isActive: false },
    { id: 4, name: 'Wrocław', temp: 19, icon: 'sun', isActive: false },
    { id: 5, name: 'Poznań', temp: 17, icon: 'sun', isActive: false },
];


function App() {
  const [cities, setCities] = useState<any[]>(initialCities);

  // Funkcja do przełączania aktywnego miasta
  const handleCitySelect = (selectedId: number) => {
    const newCities = cities.map(city => ({
        ...city, 
        isActive: city.id === selectedId
    }));
    setCities(newCities);
  };
  
return (
    <div className="main-layout"> 
      
      <Sidebar 
          cities={cities}
          onCitySelect={handleCitySelect}
      >
          <div className="title">
              <h3>Weather App</h3>
          </div>
      </Sidebar>
      
      <main className="main-content">
        <h1>Dashboard Pogody</h1>
        <p>Aktualnie wybrane miasto: <b>{cities.find(c => c.isActive)?.name || 'Brak'}</b></p>
      </main>
      
    </div>
  );
}

export default App
