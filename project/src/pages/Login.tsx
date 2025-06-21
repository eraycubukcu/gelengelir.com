import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { LogIn, User, Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = (data: any) => {
    // Mock giriş kontrolü
    if (data.username === 'eray' && data.password === '123') {
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Giriş başarılı!');
      navigate('/');
    } else {
      toast.error('Kullanıcı adı veya şifre yanlış!');
      setError('Kullanıcı adı veya şifre yanlış');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800/50 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent">
            Tekrar Hoş Geldin!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Giriş yap ve yeni maceralara atıl.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
            <input
              {...register('username')}
              type="text"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Kullanıcı Adı"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
            <input
              {...register('password')}
              type="password"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Şifre"
            />
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition"
            >
              <LogIn className="w-5 h-5" /> Giriş Yap
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Hesabın yok mu?{' '}
          <Link to="/kayit" className="font-medium text-violet-600 dark:text-violet-400 hover:underline">
            Hemen Kaydol
          </Link>
        </p>
      </div>
    </div>
  );
}; 