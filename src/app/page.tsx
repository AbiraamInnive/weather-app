import Head from 'next/head';
import UnitToggle from '../components/UnitToggle';
import SearchBar from '../components/SearchBar';
import FavoriteCities from '../components/FavouriteCities';
import CurrentLocationWeather from '../components/CurrentLocationWeather';
import { ToastContainer } from "react-toastify";
export default function Home() {

  return (
    <div className='bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100'>
      <Head>
        <title>Weather Forecast App</title>
        <meta name="description" content="A weather forecast app built with Next.js and Tailwind CSS" />
      </Head>

      <ToastContainer position="top-right" autoClose={4000} />
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-md border-b border-white/30 px-6 py-8 rounded-b-2xl">
        <div className="flex items-center justify-between relative">
          {/* Left: Unit Toggle */}
          <div className="z-10">
            <UnitToggle />
          </div>

          {/* Center: Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text drop-shadow-md">
              ☀️ Weather Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 tracking-wide">
              Real-time Forecasts, Anywhere.
            </p>
          </div>

        </div>
      </header>

      <div className="min-h-screen px-20 text-gray-800 p-4">
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mx-auto">

          {/* Left Sidebar */}
          <section className="lg:col-span-4 flex flex-col h-full">
            <div className="flex-grow bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-2xl shadow-lg p-4 transition-all hover:shadow-xl h-full">
              <CurrentLocationWeather />
            </div>
          </section>

          {/* Center (SearchBar) */}
          <section className="lg:col-span-6 flex flex-col h-full">
            <div className="flex-grow bg-white/30 dark backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-2xl shadow-lg p-4 transition-all hover:shadow-xl h-full">
              <SearchBar />
            </div>
          </section>

          {/* Right Content */}
          <section className="lg:col-span-2 flex flex-col h-full">
            <div className="flex-grow bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-2xl shadow-lg p-4 transition-all hover:shadow-xl h-full">
              <FavoriteCities />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
