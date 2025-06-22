import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { UserPlus, User, Lock, Mail } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdStore } from '../store/useAdStore';

const registerSchema = z
  .object({
    username: z.string().min(3, { message: 'Kullanıcı adı en az 3 karakter olmalıdır.' }),
    email: z.string().email({ message: 'Lütfen geçerli bir e-posta adresi girin.' }),
    password: z
      .string()
      .min(8, { message: 'Şifre en az 8 karakter olmalıdır.' })
      .regex(/[A-Za-z]/, { message: 'Şifre en az bir harf içermelidir.' })
      .regex(/[0-9]/, { message: 'Şifre en az bir rakam içermelidir.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor.',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const registerUser = useAdStore((state) => state.registerUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const success = registerUser({ name: data.username, email: data.email, password: data.password });
    
    if (success) {
      toast.success('Kaydınız başarıyla oluşturuldu! Hoş geldiniz!');
      navigate('/');
    } else {
      setError('email', {
        type: 'manual',
        message: 'Bu e-posta adresi zaten kullanımda.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-400px)] p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="animate-fade-in w-full max-w-md">
        <div className="w-full p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 bg-white dark:bg-gray-800/50 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent">
              Aramıza Katıl
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">Yeni bir hesap oluştur ve topluluğa dahil ol.</p>
          </div>
          <form className="space-y-2.5 sm:space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="relative">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-violet-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  {...register('username')}
                  type="text"
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 transition text-sm sm:text-base ${
                    errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'
                  }`}
                  placeholder="Kullanıcı Adı"
                />
              </div>
              {errors.username && <p className="text-red-500 text-xs mt-1 ml-1">{errors.username.message}</p>}
            </div>
            <div>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-violet-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 transition text-sm sm:text-base ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'
                  }`}
                  placeholder="E-posta"
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
            <div>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-violet-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 transition text-sm sm:text-base ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'
                  }`}
                  placeholder="Şifre Tekrar"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>}
            </div>
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
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" /> Kayıt Ol
                  </>
                )}
              </button>
            </div>
          </form>
          <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Zaten bir hesabın var mı?{' '}
            <Link to="/giris" className="font-medium text-violet-600 dark:text-violet-400 hover:underline">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 