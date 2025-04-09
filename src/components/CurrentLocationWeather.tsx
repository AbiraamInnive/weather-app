"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getWeatherByCoords,
    getForecastByCoords,
} from "@/lib/weather";
import WeatherCard from "./WeatherCard";
import ForecastGrid from "./ForecastGrid";
import { useWeatherStore } from "@/store/useWeatherStore";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";

export default function CurrentLocationWeather() {
    const [data, setData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { unit } = useWeatherStore();

    const fetchWeather = useCallback(async () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported.");
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    const [weather, forecastData] = await Promise.all([
                        getWeatherByCoords(latitude, longitude),
                        getForecastByCoords(latitude, longitude),
                    ]);

                    setData(weather);
                    setForecast(forecastData.list);
                } catch (err: any) {
                    const message = err.message || "Could not fetch weather data.";
                    setError(message);
                    toast.error(message);
                } finally {
                    setLoading(false);
                }
            },
            () => {
                const message = "❌ Location access denied or unavailable.";
                setError(message);
                toast.error(message);
                setLoading(false);
            }
        );
    }, [unit]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4 border-b pb-2">
                🌤️ Current Weather
            </h2>
            {loading && (
                <div className="flex flex-col items-center mt-4">
                    <DotLoader color="#3b82f6" size={40} />
                    <p className="text-sm text-blue-600 mt-2">Fetching location weather...</p>
                </div>
            )}

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            {data && (
                <div className="flex flex-col items-center gap-4 mt-4">
                    <WeatherCard data={data} />
                    <ForecastGrid DetailedView={false} data={forecast} />
                </div>
            )}
        </div>
    );
}
