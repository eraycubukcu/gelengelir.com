import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import { ProtectedRoute } from './components/ProtectedRoute';

// Layout for the main app pages with Header and Footer
const MainLayout = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Main application routes with Header and Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="iletisim" element={<Contact />} />
        <Route path="giris" element={<Login />} />
        <Route path="kayit" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="create" element={<CreateAd />} />
          <Route path="profil" element={<Profile />} />
          <Route path="profil-duzenle" element={<EditProfile />} />
        </Route>
      </Route>
    </Routes>
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