import './App.css'
import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar.tsx';
import CurrentTimeDisplay from './components/current-time.tsx';
import WeatherDashboard from './components/weather-card.tsx';
import WeatherDetailCard from './components/weather-detail.tsx';
import WeatherForecast from './components/weather-forecast.tsx';
import { fetchCityWeather, WeatherData } from './components/weatherApi.tsx';
import { CityData } from './components/city-list-item.tsx';

const INITIAL_CITY_COORDINATES = [
    { name: 'Warsaw', lat: 52.2297, lon: 21.0122, id: 1 },
    { name: 'Krakow', lat: 50.0833, lon: 19.9167, id: 2 },
    { name: 'Gdansk', lat: 54.3520, lon: 18.6464, id: 3 },
    { name: 'Wroclaw', lat: 51.1079, lon: 17.0385, id: 4 },
    { name: 'Poznan', lat: 52.4064, lon: 16.9252, id: 5 },
];

interface CityDataWithAPI extends WeatherData {
    isActive: boolean;
}

function App() {
    const [cities, setCities] = useState<CityDataWithAPI[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCityId, setActiveCityId] = useState<number>(1);

    useEffect(() => {
        const loadAllCities = async () => {
            setIsLoading(true);
            const cityPromises = INITIAL_CITY_COORDINATES.map(city => fetchCityWeather(city));
            const results = await Promise.all(cityPromises);
            const loadedCities: CityDataWithAPI[] = results
                .filter((city): city is WeatherData => city !== null)
                .map((city, index) => ({
                    ...city,
                    isActive: index === 0,
                }));
            setCities(loadedCities);
            setIsLoading(false);
        };
        loadAllCities();
    }, []);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCitySelect = (selectedId: number) => {
        const newCities = cities.map(city => ({
            ...city, 
            isActive: city.id === selectedId
        }));
        setCities(newCities);
    };
    if (isLoading) {
        return (
            <div className="loading-screen">
                Loading weather data...
            </div>
        );
    }
    const activeCity = cities.find(c => c.isActive);
    if (!activeCity) {
        return <div>No active city data available.</div>;
    }    
    return (
        <div className="main-layout"> 
            <button className="menu-toggle-button" onClick={toggleSidebar}>
                ☰ 
            </button>
      
            <Sidebar 
                cities={cities}
                onCitySelect={handleCitySelect}
                className={isSidebarOpen ? 'sidebar--open' : ''}>
                <div className="title">
                    <h3>Weather App</h3>
                </div>
            </Sidebar>
      
            <main className="main-content">
                <h1 className="city-title">{cities.find(c => c.isActive)?.name || 'Brak'}</h1>
                <CurrentTimeDisplay />

                {activeCity ? (<WeatherDashboard city={activeCity} />) : (
                    <h1>Select a city from the side list to view the weather.</h1>
                )}
                <h2>Details</h2>
                <div className="detail-cards-row">
                    <WeatherDetailCard label="FEELS LIKE" value={`${activeCity.feelsLike}°C`} />
                    <WeatherDetailCard label="HUMIDITY" value={`${activeCity.humidity}%`} />
                    <WeatherDetailCard label="WIND SPEED" value={`${activeCity.windSpeed} km/h`} />
                    <WeatherDetailCard label="WIND DIRECTION" value={`${activeCity.windDir}`} />
                    <WeatherDetailCard label="PRECIPITATION" value={`${activeCity.precipitation}%`} />
                    <WeatherDetailCard label="TYPE OF PRECIPITATION" value={`${activeCity.precipType}`} />
                    <WeatherDetailCard label="AMOUNT PRECIPITATION" value={`${activeCity.precipAmount}mm`} />
                    <WeatherDetailCard label="PRESSURE" value={`${activeCity.pressure}hPa`} />
                </div>
                <div className="app-container">
                    {activeCity && activeCity.forecast ? (
                    <WeatherForecast forecast={activeCity.forecast} />
                    ) : (
                    <p>Loading forecast data...</p>
                    )}
                </div>
            </main>
        </div>
  );  
}


export default App
