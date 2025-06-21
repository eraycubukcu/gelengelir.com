import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} gelengelir.com. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Anasayfa</Link>
            <Link to="/iletisim" className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">İletişim</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}; 