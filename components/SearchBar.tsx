"use client";

import { useState, useEffect } from "react";
import {
  getWeatherByCity,
  getForecastByCity,
} from "@/lib/weather";
import WeatherCard from "./WeatherCard";
import ForecastGrid from "./ForecastGrid";
import { useWeatherStore } from "@/store/useWeatherStore";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}
export default function SearchBar() {
  const { query, setQuery } = useWeatherStore();
  const [data, setData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { unit, favorites, addFavorite } = useWeatherStore();


  useEffect(() => {
    if (data?.name && hasSearched) {
      handleSearch();
    }
  }, [unit]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const [weather, forecastData] = await Promise.all([
        getWeatherByCity(query),
        getForecastByCity(query),
      ]);
      setData(weather);
      setForecast(forecastData.list);
    } catch (err: any) {
      const message =
        err.message === "city not found"
          ? "Invalid city or ZIP code."
          : err.message || "Failed to fetch weather data.";
      setError(message);
      toast.error(message);
      setData(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleAddFavorite = () => {
    if (!data?.name) return;
    if (favorites.includes(data.name)) {
      toast.info("Already in favorites.");
      return;
    }
    if (favorites.length >= 3) {
      toast.error("Maximum of 3 cities can be favorited.");
      return;
    }

    addFavorite(data.name);
    toast.success(`${data.name} added to favorites.`);
  };

  return (
    <div className="flex flex-col items-center gap-1 mb-8 w-full px-4">
      {/* Search Input */}
      <div className="w-full max-w-4xl flex justify-between items-center gap-4">
        <div className="flex flex-grow justify-between">
          <div className="flex w-full max-w-lg shadow-md bg-white rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400">
            <input
              type="text"
              placeholder="🔍 Search by city or ZIP code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        {data?.name && (
          <button
            onClick={handleAddFavorite}
            className="flex items-center cursor-pointer gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition whitespace-nowrap"
          >
            <Star size={16} />
            Add to Favorites
          </button>
        )}
      </div>

      {/* Initial Prompt */}
      {!data && !loading && !hasSearched && (
        <div className="flex justify-center items-center w-full h-[60vh]">
          <p className="text-gray-600 text-base text-center">
            🌤️ Start by searching for a city or ZIP code to see the weather forecast.
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center w-full h-[60vh]">
          <DotLoader color="#3b82f6" size={40} />
          <p className="text-sm text-blue-600 mt-2">Fetching weather data...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex justify-center items-center w-full h-[60vh]">
          <p className="text-gray-600 text-base text-center">
            {error}
          </p>
        </div>
      )}

      {/* Weather Info */}
      {data && (
        <div className="w-full max-w-4xl flex flex-col items-center gap-4 mt-4">
          <WeatherCard data={data} />
          <ForecastGrid data={forecast} />
        </div>
      )}
    </div>
  );
}
