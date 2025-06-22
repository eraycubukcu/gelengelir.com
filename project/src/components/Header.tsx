import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Plus, Search, Sun, Moon, Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useAdStore } from '../store/useAdStore';
import { toast } from 'react-hot-toast';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { currentUser, theme, setTheme, logoutUser } = useAdStore((state) => ({
    currentUser: state.currentUser,
    theme: state.theme,
    setTheme: state.setTheme,
    logoutUser: state.logoutUser,
  }));
  
  const wasLoggedIn = React.useRef(!!currentUser);

  useEffect(() => {
    // Detect logout
    if (wasLoggedIn.current && !currentUser) {
      toast.success('Başarıyla çıkış yapıldı!');
      navigate('/giris');
    }
    wasLoggedIn.current = !!currentUser;
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logoutUser();
    setIsMenuOpen(false);
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
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                gelengelir.com
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-2">
              {currentUser && (
                <>
                  <Link to="/" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === '/' 
                      ? 'bg-gradient-to-r from-violet-100 to-amber-100 dark:from-violet-900/30 dark:to-amber-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-700 shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-amber-50 dark:hover:from-violet-900/20 dark:hover:to-amber-900/20 hover:text-violet-600 dark:hover:text-violet-300'
                  }`}>
                    <span className="flex items-center gap-2">
                      <span>🏠</span>
                      İlanlar
                    </span>
                  </Link>
                  <Link
                    to="/create"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-amber-500 hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>İlan Ver</span>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </Link>
                  <Link
                    to="/iletisim"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      location.pathname === '/iletisim' 
                        ? 'bg-gradient-to-r from-violet-100 to-amber-100 dark:from-violet-900/30 dark:to-amber-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-700 shadow-md' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-amber-50 dark:hover:from-violet-900/20 dark:hover:to-amber-900/20 hover:text-violet-600 dark:hover:text-violet-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>📞</span>
                      Bize Ulaşın
                    </span>
                  </Link>
                </>
              )}
            </nav>

            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 ml-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-amber-50 dark:hover:from-violet-900/20 dark:hover:to-amber-900/20 transition-all duration-300 hover:scale-110"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            {/* Auth section */}
            <div className="hidden md:flex items-center ml-4">
              {currentUser ? (
                <>
                  <Link to="/profil" className="flex items-center group">
                    <div className="relative">
                      <img src={currentUser.avatar} alt="Profil" className="w-10 h-10 rounded-full border-2 border-violet-200 hover:border-violet-400 transition-all duration-300 hover:scale-110 shadow-md" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="ml-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 text-red-600 dark:text-red-400 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/40 dark:hover:to-pink-900/40 text-sm font-semibold transition-all duration-300 hover:scale-105 border border-red-200 dark:border-red-800">
                    <LogOut className="w-4 h-4" />
                    <span>Çıkış Yap</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/giris" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-amber-50 dark:hover:from-violet-900/20 dark:hover:to-amber-900/20 transition-all duration-300 hover:scale-105">
                    <LogIn className="w-4 h-4" />
                    <span>Giriş Yap</span>
                  </Link>
                  <Link to="/kayit" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-amber-500 hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md">
                    <UserPlus className="w-4 h-4" />
                    <span>Kayıt Ol</span>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden ml-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-amber-50 dark:hover:from-violet-900/20 dark:hover:to-amber-900/20 transition-all duration-300">
                <span className="sr-only">Menüyü aç</span>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-1 bg-gradient-to-br from-violet-50/50 to-amber-50/50 dark:from-violet-900/10 dark:to-amber-900/10 rounded-xl mt-2 border border-violet-200 dark:border-violet-800">
            <nav className="flex flex-col">
              {currentUser ? (
                <>
                  {navLinks}
                  <Link to="/profil" className="flex items-center space-x-3 px-4 py-3 mt-2 border-t border-violet-200 dark:border-violet-700 hover:bg-gradient-to-r hover:from-violet-100 hover:to-amber-100 dark:hover:from-violet-900/20 dark:hover:to-amber-900/20 rounded-lg transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative">
                      <img src={currentUser.avatar} alt="Profil" className="w-10 h-10 rounded-full border-2 border-violet-200" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base">{currentUser.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 text-left font-medium text-red-600 dark:text-red-400 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 rounded-lg transition-all duration-300 text-sm sm:text-base">
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="border-t border-violet-200 dark:border-violet-700 pt-4 mt-4">
                  <Link to="/giris" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-violet-100 hover:to-amber-100 dark:hover:from-violet-900/20 dark:hover:to-amber-900/20 transition-all duration-300">
                     <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                     Giriş Yap
                  </Link>
                  <Link to="/kayit" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 mt-2 px-4 py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-violet-600 to-amber-500 rounded-lg hover:scale-105 transition-all duration-300 shadow-md">
                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};