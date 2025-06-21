import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { UserPlus, User, Lock, Mail } from 'lucide-react';

export const Register: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    localStorage.setItem('isLoggedIn', 'true');
    toast.success('Kaydınız başarıyla oluşturuldu!');
    navigate('/');
  };

  return (
    <div className="animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800/50 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent">
            Aramıza Katıl
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Yeni bir hesap oluştur ve topluluğa dahil ol.</p>
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
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
            <input
              {...register('email')}
              type="email"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="E-posta"
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
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition"
            >
              <UserPlus className="w-5 h-5" /> Kayıt Ol
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Zaten bir hesabın var mı?{' '}
          <Link to="/giris" className="font-medium text-violet-600 dark:text-violet-400 hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}; 