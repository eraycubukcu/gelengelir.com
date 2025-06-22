import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Tag, MessageCircle } from 'lucide-react';
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
    { name: 'Ayşe', text: 'Harika bir fikir! Ben de geliyorum.' },
    { name: 'Mehmet', text: 'Orada görüşürüz!' }
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

  return (
    <div className={`bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 group overflow-hidden scale-100 hover:scale-105 relative hover-lift ${isPast ? 'opacity-60 grayscale' : ''}`}>
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
      <div className="p-4 sm:p-6 pb-3 sm:pb-4 relative z-10">
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
              onClick={() => setShowComments(!showComments)}
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
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-violet-50/50 to-amber-50/50 dark:from-violet-900/10 dark:to-amber-900/10 rounded-lg p-3 sm:p-4">
            {currentUser && (
              <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-3 sm:mb-4">
                <input
                  type="text"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Yorum yaz..."
                  className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-full text-xs sm:text-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 transition-all duration-200"
                />
                <button type="submit" className="bg-gradient-to-r from-violet-500 to-amber-400 text-white px-3 sm:px-4 py-1.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg">
                  <span className="flex items-center gap-1">
                    <span>💬</span>
                    <span className="hidden sm:inline">Gönder</span>
                    <span className="sm:hidden">→</span>
                  </span>
                </button>
              </form>
            )}
            
            <div className="space-y-2 sm:space-y-3">
              {comments.map((comment, index) => (
                <div key={index} className="bg-white dark:bg-gray-800/50 rounded-lg p-2.5 sm:p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs sm:text-sm font-bold">{comment.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-1">{comment.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};