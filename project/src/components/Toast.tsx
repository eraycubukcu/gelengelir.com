import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-base transition-all duration-300 animate-fade-in-up flex items-center gap-2
        ${type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-pink-400'}`}
      role="alert"
      aria-live="assertive"
    >
      {type === 'success' ? (
        <span className="text-xl">✅</span>
      ) : (
        <span className="text-xl">❌</span>
      )}
      <span>{message}</span>
    </div>
  );
};

// Animasyon için ek CSS:
// .animate-fade-in-up { animation: fadeInUp 0.4s; }
// @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } } 