import React from 'react';
import { AdCard } from '../components/AdCard';
import { useAdStore } from '../store/useAdStore';
import { CategoryFilter } from '../components/CategoryFilter';

export const Home: React.FC = () => {
  const getFilteredAds = useAdStore((state) => state.getFilteredAds);
  const ads = getFilteredAds();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hoşgeldin Mesajı */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold p-3 bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent mb-2">
          Etkinliğini Bul, Topluluğa Katıl!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Spor, oyun, sinema ve daha fazlası... Aradığın her türlü sosyal etkinlik burada.
        </p>
      </div>

      <CategoryFilter />

      {ads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 items-start">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <p className="text-2xl font-semibold text-gray-500 dark:text-gray-400 mb-4 animate-bounce">🤔</p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Aradığın kriterlere uygun bir macera bulamadık.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Filtreleri değiştirmeyi veya daha sonra tekrar denemeyi unutma!
          </p>
        </div>
      )}
    </main>
  );
};