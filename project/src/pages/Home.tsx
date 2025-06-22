import React from 'react';
import { AdCard } from '../components/AdCard';
import { useAdStore } from '../store/useAdStore';
import { CategoryFilter } from '../components/CategoryFilter';
import { Users, Calendar, MapPin, Star, TrendingUp, Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const getFilteredAds = useAdStore((state) => state.getFilteredAds);
  const ads = getFilteredAds();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-amber-500 p-6 sm:p-8 md:p-12 mb-8 sm:mb-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white mb-3 sm:mb-4 animate-fade-in-up leading-tight">
            Etkinliğini Bul, <span className="text-yellow-300">Topluluğa Katıl!</span>
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 animate-fade-in-up animation-delay-200 px-2">
            Spor, oyun, sinema ve daha fazlası... Aradığın her türlü sosyal etkinlik burada.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">150+</div>
              <div className="text-xs sm:text-sm text-white/80">Aktif Etkinlik</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">2.5K+</div>
              <div className="text-xs sm:text-sm text-white/80">Katılımcı</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">4.8</div>
              <div className="text-xs sm:text-sm text-white/80">Ortalama Puan</div>
            </div>
          </div>
        </div>
      </div>

      <CategoryFilter />

      {ads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 items-start">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16 px-4">
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-violet-100 to-amber-100 dark:from-violet-900/20 dark:to-amber-900/20 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-3xl sm:text-4xl">🤔</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full flex items-center justify-center animate-pulse">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
            Henüz Etkinlik Yok
          </h3>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-md mx-auto">
            Aradığın kriterlere uygun bir macera bulamadık.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-gradient-to-r from-violet-100 to-amber-100 dark:from-violet-900/20 dark:to-amber-900/20 rounded-lg p-4 border border-violet-200 dark:border-violet-800">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 dark:text-violet-400" />
                <span className="font-semibold text-sm sm:text-base text-violet-800 dark:text-violet-300">Öneriler:</span>
              </div>
              <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Filtreleri değiştirmeyi dene</li>
                <li>• Daha sonra tekrar kontrol et</li>
                <li>• Kendi etkinliğini oluştur</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};