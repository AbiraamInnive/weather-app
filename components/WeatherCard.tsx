"use client";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
  wind: {
    speed: number;
  };
}

export default function WeatherCard({ data }: { data: WeatherData }) {
  return (
    <div className="w-full bg-[#f4f9ff] rounded-2xl shadow-xl overflow-hidden">
      {/* Header with location and description */}
      <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-6 flex flex-col sm:flex-row justify-between items-center text-white">
        <div>
          <h2 className="text-3xl font-bold">{data.name}</h2>
          <p className="capitalize text-sm mt-1">{data.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-20 h-20 mt-4 sm:mt-0"
        />
      </div>

      {/* Temperature Display */}
      <div className="p-6 text-center">
        <p className="text-5xl font-extrabold text-blue-600">
          {Math.round(data.main.temp)}°
        </p>
        <p className="text-gray-500 mt-1 text-sm">
          Current Temperature —{" "}
          <span className="text-blue-500 font-medium">
            Feels Like {Math.round(data.main.feels_like)}°
          </span>
        </p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 pb-6 text-center">
        {[
          { label: "🧊 Min Temp", value: `${Math.round(data.main.temp_min)}°` },
          { label: "🔥 Max Temp", value: `${Math.round(data.main.temp_max)}°` },
          { label: "💧 Humidity", value: `${data.main.humidity}%` },
          { label: "🌬️ Wind Speed", value: `${data.wind.speed} m/s` },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-between min-h-[100px]"
          >
            <p className="text-gray-500 text-sm mb-1">{item.label}</p>
            <p className="text-md font-semibold mt-auto">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
