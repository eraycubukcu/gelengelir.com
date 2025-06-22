import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdStore } from '../store/useAdStore';
import { AdCard } from '../components/AdCard';
import { Mail, User, Info, Instagram, Twitter, Loader2 } from 'lucide-react';

export const Profile: React.FC = () => {
  const { currentUser, getUpcomingEvents, getPastEvents, getMyAds } = useAdStore((state) => ({
    currentUser: state.currentUser,
    getUpcomingEvents: state.getUpcomingEvents,
    getPastEvents: state.getPastEvents,
    getMyAds: state.getMyAds,
  }));

  const [tab, setTab] = useState<'upcoming' | 'past' | 'myads'>('upcoming');

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
      </div>
    );
  }
  
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const myAds = getMyAds();

  // İstatistikler ve rozetler
  const joinedCount = upcomingEvents.length + pastEvents.length;
  const myAdsCount = myAds.length;
  const badges = [
    { icon: '🏅', label: 'Sosyal', desc: '3+ etkinliğe katıldı' },
    { icon: '🌟', label: 'Organizatör', desc: 'İlan açtı' },
    { icon: '🔥', label: 'Aktif', desc: 'Son 7 gün aktif' },
  ];

  return (
    <div className="flex flex-col items-center py-8 sm:py-16 px-2 animate-fade-in-up">
      {/* Profil Kartı */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800/50 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8 flex flex-col items-center mb-6 sm:mb-10 relative overflow-visible mt-4 sm:mt-8">
        <div className="absolute -top-8 sm:-top-12">
          <img src={currentUser.avatar} alt="Profil" className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-violet-400 dark:border-violet-500 shadow-xl bg-white" />
        </div>
        <div className="mt-16 sm:mt-20 w-full flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent mb-2">Profilin</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 text-center">Hoş geldin, <span className="font-semibold text-gray-700 dark:text-gray-200">{currentUser.name}</span>!</p>
          {/* İstatistikler */}
          <div className="flex gap-4 sm:gap-6 mb-3 sm:mb-4">
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl font-bold text-violet-600 dark:text-violet-400">{joinedCount}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center">Katıldığı Etkinlik</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-xl font-bold text-amber-500 dark:text-amber-400">{myAdsCount}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center">Açtığı İlan</span>
            </div>
          </div>
          {/* Rozetler */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 justify-center">
            {badges.map((b, i) => (
              <div key={i} className="flex flex-col items-center bg-indigo-50 dark:bg-gray-700/50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl shadow text-xs">
                <span className="text-xl sm:text-2xl mb-1">{b.icon}</span>
                <span className="font-semibold text-violet-600 dark:text-violet-400 text-center">{b.label}</span>
                <span className="text-gray-500 dark:text-gray-400 text-center">{b.desc}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full max-w-xs mx-auto mb-3 sm:mb-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base"><User className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 flex-shrink-0" /> <span className="font-medium">{currentUser.name}</span></div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base"><Mail className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 flex-shrink-0" /> <span className="break-all">{currentUser.email}</span></div>
            <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base"><Info className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 flex-shrink-0 mt-0.5" /> <span>{currentUser.bio}</span></div>
          </div>
          <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
            <a href={`mailto:${currentUser.email}`} className="text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400" title="Mail"><Mail className="w-5 h-5 sm:w-6 sm:h-6" /></a>
            <a href={`https://instagram.com/${currentUser.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-pink-500 dark:hover:text-pink-400" title="Instagram"><Instagram className="w-5 h-5 sm:w-6 sm:h-6" /></a>
            <a href={`https://twitter.com/${currentUser.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-sky-500 dark:hover:text-sky-400" title="Twitter"><Twitter className="w-5 h-5 sm:w-6 sm:h-6" /></a>
          </div>
          <Link to="/profil-duzenle" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition text-sm sm:text-base">
            <User className="w-4 h-4 sm:w-5 sm:h-5" /> Profili Düzenle
          </Link>
        </div>
      </div>

      {/* Etkinlikler Sekmesi */}
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8 mt-2 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8 justify-center">
          <button
            className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all text-sm sm:text-lg ${tab === 'upcoming' ? 'bg-gradient-to-r from-violet-500 to-amber-400 text-white shadow' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            onClick={() => setTab('upcoming')}
          >
            Beklenen Etkinlikler
          </button>
          <button
            className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all text-sm sm:text-lg ${tab === 'past' ? 'bg-gradient-to-r from-violet-500 to-amber-400 text-white shadow' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            onClick={() => setTab('past')}
          >
            Geçmiş Etkinlikler
          </button>
          <button
            className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all text-sm sm:text-lg ${tab === 'myads' ? 'bg-gradient-to-r from-violet-500 to-amber-400 text-white shadow' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            onClick={() => setTab('myads')}
          >
            Kendi İlanlarım
          </button>
        </div>
        {tab === 'upcoming' ? (
          upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
              {upcomingEvents.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-400 dark:text-gray-500 py-8 sm:py-12 animate-pulse">
              <span className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎈</span>
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 text-center">Henüz beklenen etkinliğiniz yok.</p>
            </div>
          )
        ) : tab === 'past' ? (
          pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
              {pastEvents.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-400 dark:text-gray-500 py-8 sm:py-12 animate-pulse">
              <span className="text-4xl sm:text-6xl mb-3 sm:mb-4">⏳</span>
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 text-center">Geçmiş etkinliğiniz yok.</p>
            </div>
          )
        ) : (
          myAds.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
              {myAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-400 dark:text-gray-500 py-8 sm:py-12 animate-pulse">
              <span className="text-4xl sm:text-6xl mb-3 sm:mb-4">📢</span>
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 text-center">Henüz bir ilan oluşturmadınız.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}; 