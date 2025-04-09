import { useWeatherStore } from "@/store/useWeatherStore";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function fetchWithHandling(url: string, errorMsg: string) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            const errData = await res.json();
            const message = errData?.message || errorMsg;
            throw new Error(message);
        }
        return await res.json();
    } catch (err) {
        if (err instanceof TypeError && err.message.includes("fetch")) {
            throw new Error("Network error. Please check your connection.");
        }
        throw err;
    }
}

export async function getWeatherByCity(city: string) {
    const unit = useWeatherStore.getState().unit;
    const url = `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`;
    return fetchWithHandling(url, "Weather API error");
}

export async function getForecastByCity(city: string) {
    const unit = useWeatherStore.getState().unit;
    const url = `${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`;
    return fetchWithHandling(url, "Forecast API error");
}

export async function getWeatherByCoords(lat: number, lon: number) {
    const unit = useWeatherStore.getState().unit;
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
    return fetchWithHandling(url, "Weather API error");
}

export async function getForecastByCoords(lat: number, lon: number) {
    const unit = useWeatherStore.getState().unit;
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
    return fetchWithHandling(url, "Forecast API error");
}