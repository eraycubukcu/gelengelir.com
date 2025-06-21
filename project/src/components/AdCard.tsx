import React, { useState } from 'react';
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
  const { joinAd, joinedAdIds, currentUser } = useAdStore((state) => ({
    joinAd: state.joinAd,
    joinedAdIds: state.joinedAdIds,
    currentUser: state.currentUser,
  }));
  const isFullyBooked = ad.currentParticipants >= ad.maxParticipants;
  const isJoined = joinedAdIds.includes(ad.id);
  const isMyAd = ad.authorContact === currentUser.email;

  const [comments, setComments] = useState([
    { name: 'Ayşe', text: 'Harika bir fikir! Ben de geliyorum.' },
    { name: 'Mehmet', text: 'Orada görüşürüz!' }
  ]);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleJoin = () => {
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
    if (comment.trim()) {
      setComments([...comments, { name: currentUser.name, text: comment }]);
      setComment('');
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 group overflow-hidden scale-100 hover:scale-105 relative ${isPast ? 'opacity-60 grayscale' : ''}`}>
      {isPast && (
        <div className="absolute top-4 right-4 bg-gray-700 dark:bg-gray-900 text-white text-xs px-3 py-1 rounded-full shadow z-10">Geçmiş Etkinlik</div>
      )}
      {/* Category Badge */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${ad.category.color} text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
            {ad.category.name}
          </div>
          {isFullyBooked && !isPast ? (
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow animate-pulse">DOLU</div>
          ) : (
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span>{ad.currentParticipants}/{ad.maxParticipants}</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {ad.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{ad.description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
            <span>{format(new Date(ad.date), 'dd MMMM yyyy', { locale: tr })}</span>
            {ad.time && (
              <>
                <Clock className="w-4 h-4 ml-4 mr-2 text-indigo-500" />
                <span>{ad.time}</span>
              </>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
            <span>{ad.location}</span>
          </div>
        </div>

        {/* Tags */}
        {ad.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {ad.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author & Contact */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center">
            <img src={ad.authorAvatar} alt={ad.authorName} className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{ad.authorName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{ad.authorContact}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowComments(!showComments)}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Yorumları göster"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              disabled={isFullyBooked || isJoined || isMyAd}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform group-hover:scale-105 focus:scale-110 focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-50 ${
                isJoined
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:brightness-110'
              }`}
              onClick={handleJoin}
            >
              {isMyAd ? 'Sizin İlanınız' : isJoined ? 'Katıldın' : isFullyBooked ? 'Dolu' : 'Katıl'}
            </button>
          </div>
        </div>
        {/* Yorum Alanı */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
            <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Yorum yaz..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
              <button type="submit" className="bg-gradient-to-r from-violet-500 to-amber-400 text-white px-4 py-1 rounded-full text-sm font-semibold hover:scale-105 transition">Gönder</button>
            </form>
            <div className="mt-2 space-y-2">
              {comments.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-sm bg-gray-50 dark:bg-gray-900/50 rounded-lg p-2">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random`} alt={c.name} className="w-6 h-6 rounded-full" />
                  <div>
                    <span className="font-semibold text-violet-600 dark:text-violet-400">{c.name}</span>
                    <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
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