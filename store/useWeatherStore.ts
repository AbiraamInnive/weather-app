import { create } from "zustand";

type WeatherUnit = "metric" | "imperial";

interface WeatherStore {
    unit: WeatherUnit;
    favorites: string[];
    query: string;
    setUnit: (unit: WeatherUnit) => void;
    addFavorite: (city: string) => void;
    removeFavorite: (city: string) => void;
    removeAllFavorites: () => void;
    setQuery: (query: string) => void;
    triggerSearchFromFavorite: (city: string) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
    unit: "metric",
    favorites: [],
    query: "",
    setUnit: (unit) => set({ unit }),
    addFavorite: (city) =>
        set((state) => ({
            favorites: state.favorites.includes(city)
                ? state.favorites
                : [...state.favorites, city],
        })),
    removeFavorite: (city) =>
        set((state) => ({
            favorites: state.favorites.filter((c) => c !== city),
        })),
    removeAllFavorites: () => set({ favorites: [] }),
    setQuery: (query) => set({ query }),
    triggerSearchFromFavorite: (city) => {
        set({ query: city });
    },
}));