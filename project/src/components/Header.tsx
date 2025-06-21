import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Plus, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useAdStore } from '../store/useAdStore';
import { toast } from 'react-hot-toast';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, theme, setTheme } = useAdStore((state) => ({
    currentUser: state.currentUser,
    theme: state.theme,
    setTheme: state.setTheme,
  }));
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.success('Başarıyla çıkış yapıldı!');
    setTimeout(() => {
      navigate('/giris');
    }, 1200);
  };

  const navLinks = (
    <>
      <Link
        to="/"
        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition block px-4 py-2"
        onClick={() => setIsMenuOpen(false)}
      >
        İlanlar
      </Link>
      <Link
        to="/create"
        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition block px-4 py-2"
        onClick={() => setIsMenuOpen(false)}
      >
        İlan Ver
      </Link>
      <Link
        to="/iletisim"
        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition block px-4 py-2"
        onClick={() => setIsMenuOpen(false)}
      >
        Bize Ulaşın
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-amber-500  bg-clip-text text-transparent">
                gelengelir.com
              </h1>
            </div>
          </Link>

          {isLoggedIn && (
            <>
              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center space-x-2">
                <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  İlanlar
                </Link>
                <Link to="/create" className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-amber-500 hover:scale-105 transition-transform">
                  <Plus className="w-4 h-4" />
                  <span>İlan Ver</span>
                </Link>
                <Link to="/iletisim" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Bize Ulaşın
                </Link>
              </nav>

              <div className="flex items-center">
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>

                {/* Profile Avatar & Logout (Desktop) */}
                <div className="hidden md:flex items-center">
                  <Link to="/profil" className="ml-4 flex items-center">
                    <img src={currentUser.avatar} alt="Profil" className="w-8 h-8 rounded-full border-2 border-violet-200 hover:scale-110 transition" />
                  </Link>
                  <button onClick={handleLogout} className="ml-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 text-sm font-semibold transition">
                    Çıkış Yap
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden ml-2">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 dark:text-gray-300">
                    <span className="sr-only">Menüyü aç</span>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && isLoggedIn && (
          <div className="md:hidden pt-2 pb-4 space-y-1">
            <nav className="flex flex-col">
              {navLinks}
              <Link to="/profil" className="flex items-center space-x-3 px-4 py-2 mt-2 border-t border-gray-200 dark:border-gray-700" onClick={() => setIsMenuOpen(false)}>
                <img src={currentUser.avatar} alt="Profil" className="w-8 h-8 rounded-full" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Profilim</span>
              </Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left font-medium text-red-600 dark:text-red-400 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                Çıkış Yap
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};