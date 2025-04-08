"use client";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
  wind: {
    speed: number;
  };
}

export default function WeatherCard({ data }: { data: WeatherData }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
      <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
      <div className="flex justify-center items-center gap-4 mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />
        <p className="text-xl capitalize">{data.weather[0].description}</p>
      </div>
      <p className="text-4xl font-bold">{Math.round(data.main.temp)}°</p>
      <div className="flex justify-around mt-4">
        <div>
          <p className="text-sm">Min</p>
          <p>{Math.round(data.main.temp_min)}°</p>
        </div>
        <div>
          <p className="text-sm">Max</p>
          <p>{Math.round(data.main.temp_max)}°</p>
        </div>
        <div>
          <p className="text-sm">Humidity</p>
          <p>{data.main.humidity}%</p>
        </div>
        <div>
          <p className="text-sm">Wind</p>
          <p>{data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}