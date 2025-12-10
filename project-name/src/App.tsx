import './App.css'
import React, { useState } from 'react';
//komponenty główne 
import Sidebar from './components/sidebar.tsx';
import CurrentTimeDisplay from './components/current-time.tsx';
import WeatherDashboard from './components/weather-card.tsx';
import WeatherDetailCard from './components/weather-detail.tsx';
// typy danych
import { CityData } from './components/city-list-item.tsx';


const initialCities: any[] = [ 
    { id: 1, name: 'Warsaw', temp: 18, icon: 'sun', isActive: true },
    { id: 2, name: 'Kraków', temp: 16, icon: 'cloud', isActive: false },
    { id: 3, name: 'Gdańsk', temp: 14, icon: 'rain', isActive: false },
    { id: 4, name: 'Wrocław', temp: 19, icon: 'sun', isActive: false },
    { id: 5, name: 'Poznań', temp: 17, icon: 'sun', isActive: false },
];



function App() {
  const [cities, setCities] = useState<any[]>(initialCities);

  const handleCitySelect = (selectedId: number) => {
    const newCities = cities.map(city => ({
        ...city, 
        isActive: city.id === selectedId
    }));
    setCities(newCities);
  };

  const activeCity = cities.find(c => c.isActive);

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
        <h1 className="city-title">{cities.find(c => c.isActive)?.name || 'Brak'}</h1>
        <p><CurrentTimeDisplay /></p>

        {activeCity ? (<WeatherDashboard city={activeCity} />) : (
                    <h1>Select a city from the side list to view the weather.</h1>
                )}
      <h2>Details</h2>
        <div className="detail-cards-row">
            <WeatherDetailCard label="FEELS LIKE" value={`17°C`} />
            <WeatherDetailCard label="HUMIDITY" value={`65%`} />
            <WeatherDetailCard label="WIND SPEED" value={`12 km/h`} />
            <WeatherDetailCard label="PRESSURE" value={`1012 hPa`} />
        </div>
      </main>
      
    </div>
  );  
}


export default App
