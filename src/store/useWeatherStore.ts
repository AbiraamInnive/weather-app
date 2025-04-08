import { create } from "zustand";

type WeatherUnit = "metric" | "imperial";

interface WeatherStore {
  unit: WeatherUnit;
  favorites: string[];
  setUnit: (unit: WeatherUnit) => void;
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  unit: "metric",
  favorites: [],
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

}));