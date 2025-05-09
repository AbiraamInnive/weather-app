"use client";
import { useState, useEffect } from "react";
import { useWeatherStore } from "@/store/useWeatherStore";
import { getWeatherByCity, getForecastByCity } from "@/lib/weather";
import WeatherCard from "./WeatherCard";
import ForecastGrid from "./ForecastGrid";

export default function FavoriteCities() {
  const { triggerSearchFromFavorite, removeFavorite, unit, favorites, query } = useWeatherStore();


  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(favorites, unit, query, 'hellu')
  const fetchCityWeather = async (city: string, forceRefresh = false) => {
    if (!forceRefresh && selectedCity === city) {
      setSelectedCity(null);
      setData(null);
      setForecast([]);
      return;
    }

    setSelectedCity(city);
    setLoading(true);
    setError(null);
    try {
      const [weather, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getForecastByCity(city),
      ]);
      setData(weather);
      setForecast(forecastData.list);
    } catch (err) {
      console.log(err)
      setError("❌ Failed to load weather for this city.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchCityWeather(selectedCity, true);
    }
  }, [unit, selectedCity, fetchCityWeather]);



  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Favourite Cities</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {favorites.length === 0 && (
          <p className="text-gray-500">No favourites yet.</p>
        )}
        {favorites.map((city) => (
          <div
            key={city}
            className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition ${selectedCity === city ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
          >
            <button
              onClick={() => triggerSearchFromFavorite(city)}
              className="focus:outline-none"
            >
              {city}
            </button>
            <button
              onClick={() => {
                removeFavorite(city);
                if (selectedCity === city) {
                  setSelectedCity(null);
                  setData(null);
                  setForecast([]);
                }
              }}
              className="cursor-pointer ml-2 text-red-400 hover:text-red-500 focus:outline-none"
              title={`Remove ${city}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {loading && selectedCity && (
        <p className="text-blue-500 mt-4 animate-pulse">
          Loading weather for <strong>{selectedCity}</strong>...
        </p>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && selectedCity && (
        <div className="mt-4">
          <WeatherCard data={data} />
          <ForecastGrid data={forecast} />
        </div>
      )}
    </div>
  );
}
