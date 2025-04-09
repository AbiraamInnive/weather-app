import moment from "moment";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

type ForecastItem = {
  dt: number;
  dt_txt: string;
  main: {
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

export default function ForecastGrid({
  data,
  DetailedView = true,
}: {
  data: ForecastItem[];
  DetailedView?: boolean;
}) {
  if (!data || !Array.isArray(data)) {
    return <p className="text-center text-gray-600">No forecast data available.</p>;
  }

  const dailyForecast = data.filter((entry) =>
    entry.dt_txt.includes("12:00:00")
  );

  const chartData = dailyForecast.map((item) => ({
    day: moment(item.dt_txt).format("ddd"),
    temp_max: Math.round(item.main.temp_max),
    temp_min: Math.round(item.main.temp_min),
  }));
  const CustomLegend = ({ payload }: any) => {
    if (!payload || payload.length === 0) return null;

    return (
      <div className="flex justify-center flex-wrap gap-6 px-4 text-sm font-medium text-gray-700">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-4 h-2 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span>
              {entry.value === "temp_max" ? "Max Temp" : "Min Temp"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative mt-6 w-full">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
        5-Day Forecast
      </h3>

      {/* Line Chart */}
      <div className="relative w-full h-72 mb-12 rounded-xl overflow-hidden shadow-md bg-white/70 backdrop-blur-md">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
          >
            <defs>
              <linearGradient id="maxTempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="minTempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#374151" tick={{ fontSize: 14 }} />
            <YAxis stroke="#374151" tick={{ fontSize: 14 }} />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const forecastForDay = dailyForecast.find((item) =>
                    moment(item.dt_txt).format("ddd") === label
                  );

                  const iconUrl = forecastForDay?.weather?.[0]?.icon
                    ? `https://openweathermap.org/img/wn/${forecastForDay.weather[0].icon}@2x.png`
                    : null;

                  return (
                    <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-md text-sm text-gray-800">
                      <p className="flex font-semibold mb-2">{label}{iconUrl && (
                        <Image
                          src={iconUrl}
                          alt={forecastForDay.weather[0].description}
                          width={30}
                          height={30}
                          className="mb-2 mx-auto"
                        />
                      )}</p>

                      <div>
                        {payload.map((item, index) => (
                          <p key={index}>
                            {item.dataKey === "temp_max" ? "Max Temp" : "Min Temp"}:{" "}
                            <span className="font-medium">{item.value}°</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Legend
              content={<CustomLegend />}
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontSize: 14, color: "#374151" }}
            />
            <Line
              type="monotone"
              dataKey="temp_max"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 6 }}
              fillOpacity={1}
              fill="url(#maxTempGradient)"
            />
            <Line
              type="monotone"
              dataKey="temp_min"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 6 }}
              fillOpacity={1}
              fill="url(#minTempGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Forecast Cards */}
      {DetailedView && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 z-10 relative">
          {dailyForecast.map((item) => {
            return (
              <div
                key={item.dt}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-4 text-center hover:shadow-2xl transition duration-300 ease-in-out"
              >
                <p className="text-md font-semibold text-gray-700 mb-2">
                  {moment(item.dt_txt).format("dddd")}
                </p>

                <Image
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  width={64}
                  height={64}
                  className="mx-auto"
                />

                <p
                  className="text-sm text-gray-600 capitalize mb-1 truncate"
                  title={item.weather[0].description}
                >
                  {item.weather[0].description}
                </p>

                <div className="text-sm text-gray-800 font-medium">
                  <p>
                    H: {Math.round(item.main.temp_max)}° | L: {Math.round(item.main.temp_min)}°
                  </p>
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
      )}
    </div>
  );
}
