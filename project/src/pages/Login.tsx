import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { LogIn, Mail, Lock } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdStore } from '../store/useAdStore';

const loginSchema = z.object({
  email: z.string().email({ message: 'Lütfen geçerli bir e-posta adresi girin.' }),
  password: z.string().min(1, { message: 'Şifre alanı boş bırakılamaz.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const loginUser = useAdStore((state) => state.loginUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    const success = loginUser(data);

    if (success) {
      toast.success('Giriş başarılı! Hoş geldiniz.');
      navigate('/');
    } else {
      setError('root', {
        type: 'manual',
        message: 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-400px)] p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="animate-fade-in w-full max-w-md">
        <div className="w-full p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 bg-white dark:bg-gray-800/50 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent">
              Tekrar Hoş Geldin!
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">Giriş yap ve yeni maceralara atıl.</p>
          </div>
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-violet-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 transition text-sm sm:text-base ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'
                  }`}
                  placeholder="E-posta Adresi"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>
            <div>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-violet-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  {...register('password')}
                  type="password"
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 transition text-sm sm:text-base ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'
                  }`}
                  placeholder="Şifre"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
            </div>

            {errors.root && (
              <div className="text-center text-xs sm:text-sm text-red-500 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                {errors.root.message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg hover:scale-105 transition disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Giriş Yapılıyor...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5" /> Giriş Yap
                  </>
                )}
              </button>
            </div>
          </form>
          <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Hesabın yok mu?{' '}
            <Link to="/kayit" className="font-medium text-violet-600 dark:text-violet-400 hover:underline">
              Hemen Kaydol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
