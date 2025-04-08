import moment from "moment";

// Simple emoji mapper for weather types
const getWeatherEmoji = (main: string) => {
  switch (main.toLowerCase()) {
    case "clear":
      return "☀️";
    case "clouds":
      return "☁️";
    case "rain":
      return "🌧️";
    case "thunderstorm":
      return "⛈️";
    case "drizzle":
      return "🌦️";
    case "snow":
      return "❄️";
    case "mist":
    case "fog":
    case "haze":
      return "🌫️";
    default:
      return "🌡️";
  }
};

export default function ForecastGrid({ data }: { data: any[] }) {
  // Filter forecast to only one item per day (e.g., 12:00 PM)
  const dailyForecast = data.filter((entry) =>
    entry.dt_txt.includes("12:00:00")
  );

  return (
    <div className="mt-6 w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecast.map((item) => {
          const emoji = getWeatherEmoji(item.weather[0].main);

          return (
            <div
              key={item.dt}
              className="bg-white border rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition duration-300 ease-in-out"
            >
              <p className="text-md font-semibold text-gray-700 mb-2">
                {moment(item.dt_txt).format("dddd")}
              </p>

              <div className="text-2xl mb-2" title={item.weather[0].main}>
                {emoji}
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="mx-auto w-16 h-16"
              />

              <p
                className="text-sm text-gray-600 capitalize mb-1 truncate"
                title={item.weather[0].description}
              >
                {item.weather[0].description}
              </p>

              <div className="text-sm text-gray-800 font-medium">
                <p>H: {Math.round(item.main.temp_max)}° | L: {Math.round(item.main.temp_min)}°</p>
                <p className="text-xs text-gray-500">
                  Feels like: {Math.round(item.main.feels_like)}°
                </p>
              </div>

              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p>💨 Wind: {item.wind.speed} m/s</p>
                <p>💧 Humidity: {item.main.humidity}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
