import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdStore } from '../store/useAdStore';

export const ProtectedRoute: React.FC = () => {
  const currentUser = useAdStore((state) => state.currentUser);

  if (!currentUser) {
    // Kullanıcı giriş yapmamışsa, onu giriş sayfasına yönlendir.
    // 'replace' prop'u, tarayıcı geçmişinde yönlendirme kaydı bırakmaz.
    return <Navigate to="/giris" replace />;
  }

  // Kullanıcı giriş yapmışsa, istenen sayfayı (çocuk bileşeni) render et.
  return <Outlet />;
}; 