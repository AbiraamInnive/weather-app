import { useWeatherStore } from "@/store/useWeatherStore";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCity(city: string) {
    const unit = useWeatherStore.getState().unit;
    const res = await fetch(
        `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Weather API error");
    return res.json();
}

export async function getForecastByCity(city: string) {
    const unit = useWeatherStore.getState().unit;
    const res = await fetch(
        `${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Forecast API error");
    return res.json();
}
export async function getWeatherByCoords(lat: number, lon: number) {
    const unit = useWeatherStore.getState().unit;
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Weather API error");
    return res.json();
}

export async function getForecastByCoords(lat: number, lon: number) {
    const unit = useWeatherStore.getState().unit;
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Weather API error");
    return res.json();
}