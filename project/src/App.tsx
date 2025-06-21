import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { CreateAd } from './pages/CreateAd';
import { Contact } from './pages/Contact';
import { Footer } from './components/Footer';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Toaster } from 'react-hot-toast';
import { useAdStore } from './store/useAdStore';

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  // Mock giriş kontrolü: localStorage'da 'isLoggedIn' varsa giriş yapılmış kabul edilir
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const publicRoutes = ['/giris', '/kayit'];
    if (!isLoggedIn && !publicRoutes.includes(location.pathname)) {
      navigate('/giris');
    }
  }, [location.pathname, navigate]);

  const isAuthPage = location.pathname === '/giris' || location.pathname === '/kayit';
  const isCenteredPage = ['/giris', '/kayit', '/profil-duzenle', '/iletisim'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <main className="h-screen flex items-center justify-center">
        <Routes>
          <Route path="/giris" element={<Login />} />
          <Route path="/kayit" element={<Register />} />
        </Routes>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
      <Header />
      <main className={`flex-grow ${isCenteredPage ? 'flex items-center justify-center' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateAd />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/profil-duzenle" element={<EditProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { theme } = useAdStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <AppRoutes />
    </Router>
  );
}

export default App;