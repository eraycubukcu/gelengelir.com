import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Tag, MessageCircle, X, Send, LogIn } from 'lucide-react';
import { Advertisement } from '../types';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useAdStore } from '../store/useAdStore';
import { toast } from 'react-hot-toast';

interface AdCardProps {
  ad: Advertisement;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const navigate = useNavigate();
  const { joinAd, joinedAdIds, currentUser } = useAdStore((state) => ({
    joinAd: state.joinAd,
    joinedAdIds: state.joinedAdIds,
    currentUser: state.currentUser,
  }));
  const isFullyBooked = ad.currentParticipants >= ad.maxParticipants;
  const isJoined = joinedAdIds.includes(ad.id);
  const isMyAd = currentUser ? ad.authorContact === currentUser.email : false;

  const [comments, setComments] = useState([
    { name: 'Ayşe', text: 'Harika bir fikir! Ben de geliyorum. Acaba yanımda arkadaşımı da getirebilir miyim?' },
    { name: 'Mehmet', text: 'Orada görüşürüz! Sabırsızlıkla bekliyorum.' },
    { name: 'Zeynep', text: 'Bu tam aradığım etkinlik! Hemen katıl butonuna bastım.' },
    { name: 'Ahmet', text: 'Etkinlik yeri tam olarak nerede acaba? Konum bilgisi biraz daha detaylı olabilir mi?' },
    { name: 'Elif', text: 'Süper görünüyor! 🥳' },
    { name: 'Can', text: 'Daha önce hiç gitmemiştim, umarım güzel geçer.' },
  ]);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleJoin = () => {
    if (!currentUser) {
      toast(
        (t) => (
          <div className="flex flex-col items-center gap-2 text-center">
            <span>Bu ilana katılmak için giriş yapmalısınız.</span>
            <div className="w-full flex gap-2 mt-2">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full rounded-md px-3 py-1 bg-gray-200 dark:bg-gray-600 text-sm"
              >
                Vazgeç
              </button>
              <button
                onClick={() => {
                  navigate('/giris');
                  toast.dismiss(t.id);
                }}
                className="w-full rounded-md px-3 py-1 bg-violet-500 text-white text-sm"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        ),
        {
          icon: '🔐',
        }
      );
      return;
    }

    if (isMyAd) {
      toast.error('Kendi ilanınıza katılamazsınız.');
      return;
    }

    joinAd(ad.id);
    toast.success('Etkinliğe katıldın!');
  };
  const isPast = new Date(ad.date) < new Date();

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && currentUser) {
      setComments([...comments, { name: currentUser.name, text: comment }]);
      setComment('');
    }
  };

  const toggleComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowComments(!showComments);
  };

  return (
    <div className={`bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 group overflow-hidden scale-100 hover:scale-105 relative hover-lift h-full flex flex-col ${isPast ? 'opacity-60 grayscale' : ''}`}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-amber-50/50 dark:from-violet-900/10 dark:to-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {isPast && (
        <div className="absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 dark:bg-gray-900 text-white text-xs px-2.5 sm:px-3 py-1 rounded-full shadow z-10 animate-pulse">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Geçmiş Etkinlik
          </span>
        </div>
      )}
      
      {/* Category Badge */}
      <div className="p-4 sm:p-6 pb-3 sm:pb-4 relative z-10 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium ${ad.category.color} text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg animate-float`}>
            <span className="mr-1">🎯</span>
            {ad.category.name}
          </div>
          {isFullyBooked && !isPast ? (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shadow animate-pulse">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                DOLU
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
              <span className="font-medium">{ad.currentParticipants}/{ad.maxParticipants}</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {ad.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3">{ad.description}</p>

        {/* Details with enhanced styling */}
        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-indigo-500 animate-pulse" />
            <span className="font-medium">{format(new Date(ad.date), 'dd MMMM yyyy', { locale: tr })}</span>
            {ad.time && (
              <>
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-3 sm:ml-4 mr-1.5 sm:mr-2 text-amber-500" />
                <span className="font-medium">{ad.time}</span>
              </>
            )}
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-500" />
            <span className="font-medium">{ad.location}</span>
          </div>
        </div>

        {/* Tags with enhanced styling */}
        {ad.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {ad.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs bg-gradient-to-r from-violet-100 to-amber-100 dark:from-violet-900/30 dark:to-amber-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:scale-105 transition-transform"
              >
                <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author & Contact with enhanced styling */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center group/author">
            <div className="relative">
              <img src={ad.authorAvatar} alt={ad.authorName} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 border-2 border-violet-200 group-hover/author:border-violet-400 transition-colors" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div className="ml-2 sm:ml-3">
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white group-hover/author:text-violet-600 dark:group-hover/author:text-violet-400 transition-colors">{ad.authorName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{ad.authorContact}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleComments}
              className="p-1.5 sm:p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 hover:scale-110"
              title="Yorumları göster"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              disabled={isFullyBooked || isJoined || isMyAd}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 transform group-hover:scale-105 focus:scale-110 focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 ${
                isJoined
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:brightness-110 hover:scale-105'
              }`}
              onClick={handleJoin}
            >
              {isMyAd ? (
                <span className="flex items-center gap-1">
                  <span>👑</span>
                  <span className="hidden sm:inline">Sizin İlanınız</span>
                  <span className="sm:hidden">Sizin</span>
                </span>
              ) : isJoined ? (
                <span className="flex items-center gap-1">
                  <span>✅</span>
                  <span className="hidden sm:inline">Katıldın</span>
                  <span className="sm:hidden">Katıldın</span>
                </span>
              ) : isFullyBooked ? (
                <span className="flex items-center gap-1">
                  <span>🚫</span>
                  <span className="hidden sm:inline">Dolu</span>
                  <span className="sm:hidden">Dolu</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <span>🎯</span>
                  <span className="hidden sm:inline">Katıl</span>
                  <span className="sm:hidden">Katıl</span>
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Yorum Alanı with enhanced styling */}
        {showComments && (
          <div className="absolute inset-0 bg-white dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl z-20 flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent">Yorumlar</h4>
              <button
                onClick={toggleComments}
                className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                title="Yorumları kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Yorum Listesi */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="flex items-start gap-3 animate-fade-in-up" style={{animationDelay: `${index * 50}ms`}}>
                    <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow">
                      <span className="text-white text-base font-bold">{comment.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-3 border border-gray-100 dark:border-gray-700/60">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{comment.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">az önce</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <MessageCircle className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-base font-semibold">Henüz yorum yok</p>
                  <p className="text-sm mt-1">İlk yorumu yaparak sohbeti başlat!</p>
                </div>
              )}
            </div>

            {/* Yorum Yapma Formu */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              {currentUser ? (
                <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow">
                    <span className="text-white text-base font-bold">{currentUser.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <input
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Yorumunuzu yazın..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition-all duration-200"
                  />
                  <button 
                    type="submit" 
                    disabled={!comment.trim()}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-2.5 rounded-full font-semibold hover:scale-110 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:saturate-50 disabled:cursor-not-allowed"
                    title="Gönder"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <button
                    onClick={() => navigate('/giris')}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Yorum yapmak için giriş yapın
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};