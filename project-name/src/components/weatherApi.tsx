const API_KEY = '1e13ef3d961f7822a0ba6a9357c087a1';
const kelvinToCelsius = (tempK: number) => Math.round(tempK - 273.15); 

const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
};

export interface DailyForecast {
  date: number;
  tempMin: number;
  tempMax: number;
  description: string;
}

export interface WeatherData {
    name: string;
    id: number;
    temp: number;
    icon: string;
    description: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    feelsLike: number;
    windDir: string;
    precipType: string;
    precipAmount: number; 
    pressure: number;
    forecast: DailyForecast[];
}

interface CityConfig { 
    name: string; 
    lat: number; 
    lon: number; 
    id: number; 
}

export const fetchCityWeather = async (cityConfig: CityConfig): Promise<WeatherData | null> => {
    try {
        const { lat, lon, name, id } = cityConfig;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl),
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            console.error(`Błąd API dla ${name}`);
            return null;
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        const precipitationProbability = forecastData.list[0]?.pop * 100 || 0;
        const dailyData = forecastData.list;
        const dailyForecasts: DailyForecast[] = [];

        for (let i = 0; i < forecastData.list.length; i += 8) {
            const dayInterval = forecastData.list.slice(i, i + 8);
            const temps = dayInterval.map((item: any) => item.main.temp);
            const minTemp = Math.min(...temps);
            const maxTemp = Math.max(...temps);
            const description = dayInterval[4]?.weather[0].main || dayInterval[0].weather[0].main;

            dailyForecasts.push({
                date: dayInterval[0].dt,
                tempMin: Math.floor(Math.min(...temps) - 273.15), 
                tempMax: Math.ceil(Math.max(...temps) - 273.15),
                description: dayInterval[0].weather[0].main
            });
        }
        const rain = weatherData.rain ? (weatherData.rain['1h'] || 0) : 0;
        const snow = weatherData.snow ? (weatherData.snow['1h'] || 0) : 0;
        const processedData: WeatherData= {
            id: id,
            name: weatherData.name,
            temp: kelvinToCelsius(weatherData.main.temp),
            icon: weatherData.weather[0].icon,
            description: weatherData.weather[0].main,
            humidity: weatherData.main.humidity,
            windSpeed: Math.round(weatherData.wind.speed * 3.6),
            precipitation: Math.round(precipitationProbability), 
            feelsLike: kelvinToCelsius(weatherData.main.feels_like),
            windDir: getWindDirection(weatherData.wind.deg),
            precipType: snow > 0 ? "Snow" : (rain > 0 ? "Rain" : "None"),
            precipAmount: rain + snow,
            pressure: weatherData.main.pressure,
            forecast: dailyForecasts
        };
        
        return processedData;
        
    } catch (error) {
        console.error(`Błąd ładowania pogody dla ${name}:`, error);
        return null;
    }
};