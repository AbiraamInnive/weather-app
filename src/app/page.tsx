import Head from 'next/head';
import UnitToggle from '../components/UnitToggle';
import SearchBar from '../components/SearchBar';
import FavoriteCities from '../components/FavouriteCities';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800 px-4 py-6">
      <Head>
        <title>Weather Forecast App</title>
        <meta name="description" content="A weather forecast app built with Next.js and Tailwind CSS" />
      </Head>
      <main className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center mb-4">☀️ Weather Forecast</h1>
        <UnitToggle />
        <div className="flex flex-col sm:flex-row items-baseline gap-4">
          <SearchBar />
        </div>
        <FavoriteCities />
      </main>
    </div>
  );
}