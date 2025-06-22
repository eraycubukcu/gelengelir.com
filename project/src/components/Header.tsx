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

          {/* Desktop Menu */}
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-2">
              {currentUser && (
                <>
                  <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/' ? 'bg-indigo-100 text-indigo-600 dark:bg-gray-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    İlanlar
                  </Link>
                  <Link
                    to="/create"
                    className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-amber-500 hover:scale-105 transition-transform"
                  >
                    <Plus className="w-4 h-4" />
                    <span>İlan Ver</span>
                  </Link>
                  <Link
                    to="/iletisim"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/iletisim' ? 'bg-indigo-100 text-indigo-600 dark:bg-gray-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    Bize Ulaşın
                  </Link>
                </>
              )}
            </nav>

            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 ml-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            {/* Auth section */}
            <div className="hidden md:flex items-center ml-4">
              {currentUser ? (
                <>
                  <Link to="/profil" className="flex items-center">
                    <img src={currentUser.avatar} alt="Profil" className="w-8 h-8 rounded-full border-2 border-violet-200 hover:scale-110 transition" />
                  </Link>
                  <button onClick={handleLogout} className="ml-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400 text-sm font-semibold transition">
                    <LogOut className="w-4 h-4" />
                    <span>Çıkış Yap</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/giris" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <LogIn className="w-4 h-4" />
                    <span>Giriş Yap</span>
                  </Link>
                  <Link to="/kayit" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-amber-500 hover:scale-105 transition-transform">
                    <UserPlus className="w-4 h-4" />
                    <span>Kayıt Ol</span>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden ml-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 dark:text-gray-300">
                <span className="sr-only">Menüyü aç</span>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-1">
            <nav className="flex flex-col">
              {currentUser ? (
                <>
                  {navLinks}
                  <Link to="/profil" className="flex items-center space-x-3 px-4 py-2 mt-2 border-t border-gray-200 dark:border-gray-700" onClick={() => setIsMenuOpen(false)}>
                    <img src={currentUser.avatar} alt="Profil" className="w-8 h-8 rounded-full" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">{currentUser.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 text-left font-medium text-red-600 dark:text-red-400 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                    <LogOut className="w-5 h-5" />
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <Link to="/giris" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                     <LogIn className="w-5 h-5" />
                     Giriş Yap
                  </Link>
                  <Link to="/kayit" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 mt-1 px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-violet-600 to-amber-500 rounded-lg">
                    <UserPlus className="w-5 h-5" />
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