"use client";
import { useWeatherStore } from "../store/useWeatherStore";
import { ThermometerSun, ThermometerSnowflake } from "lucide-react";

export default function UnitToggle() {
  const { unit, setUnit } = useWeatherStore();
  const isFahrenheit = unit === "imperial";

  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      <ThermometerSnowflake className="w-5 h-5 text-blue-500" />
      <span className={`${!isFahrenheit ? "text-blue-600" : "text-gray-500"}`}>°C</span>

      <button
        onClick={() => setUnit(isFahrenheit ? "metric" : "imperial")}
        aria-label="Toggle temperature unit"
        className={`cursor-pointer relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isFahrenheit ? "bg-blue-600" : "bg-gray-300"
          }`}
      >
        <span
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isFahrenheit ? "translate-x-6" : "translate-x-0"
            }`}
        ></span>
      </button>

      <span className={`${isFahrenheit ? "text-blue-600" : "text-gray-500"}`}>°F</span>
      <ThermometerSun className="w-5 h-5 text-yellow-500" />
    </div>
  );
}
