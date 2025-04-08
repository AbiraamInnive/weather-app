"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords,
} from "@/lib/weather";
import WeatherCard from "./WeatherCard";
import ForecastGrid from "./ForecastGrid";
import { useWeatherStore } from "@/store/useWeatherStore";
import { Search, Star } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { unit, favorites, addFavorite } = useWeatherStore();

  // Fetch weather based on geolocation (only if user hasn’t searched)
  const fetchByCoords = useCallback(async () => {
    if (!navigator.geolocation || hasSearched) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        setLoading(true);
        setError(null);

        const [weather, forecastData] = await Promise.all([
          getWeatherByCoords(latitude, longitude),
          getForecastByCoords(latitude, longitude),
        ]);
        setData(weather);
        setForecast(forecastData.list);
        setQuery(""); // reset query if using location
      } catch (err) {
        console.error("Failed to get weather by location", err);
        setError("❌ Could not get location weather.");
      } finally {
        setLoading(false);
      }
    });
  }, [hasSearched, unit]);

  // Fetch weather by coordinates once on mount
  useEffect(() => {
    fetchByCoords();
  }, [fetchByCoords]);

  // Re-fetch if unit changes and there's search data
  useEffect(() => {
    if (data?.name && hasSearched) {
      handleSearch();
    }
  }, [unit]); // only refetch for unit change if searched manually

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setHasSearched(true); // Mark that user has manually searched

    try {
      const [weather, forecastData] = await Promise.all([
        getWeatherByCity(query),
        getForecastByCity(query),
      ]);
      setData(weather);
      setForecast(forecastData.list);
    } catch (err) {
      console.error("Search failed:", err);
      setError("❌ Failed to fetch weather data.");
      setData(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleAddFavorite = () => {
    if (data?.name && !favorites.includes(data.name)) {
      addFavorite(data.name);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mb-8 w-full px-4">
      {/* Search Input */}
      <div className="flex w-full max-w-lg shadow-md bg-white rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400">
        <input
          type="text"
          placeholder="🔍 Search by city or ZIP code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow px-4 py-2 text-sm focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white px-5 py-2 flex items-center gap-2 text-sm"
        >
          <Search size={16} />
          Search
        </button>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="text-blue-500 text-sm animate-pulse">
          Fetching weather data...
        </div>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Weather Info */}
      {data && (
        <div className="w-full max-w-4xl flex flex-col items-center gap-4 mt-4">
          <WeatherCard data={data} />
          <button
            onClick={handleAddFavorite}
            className="flex items-center cursor-pointer gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
          >
            <Star size={16} />
            Add to Favorites
          </button>
          <ForecastGrid data={forecast} />
        </div>
      )}
    </div>
  );
}
