import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdStore } from '../store/useAdStore';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Info, Instagram, Twitter, Loader2 } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(3, 'İsim en az 3 karakter olmalıdır.'),
  email: z.string().email('Geçerli bir e-posta adresi girin.'),
  bio: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useAdStore((state) => ({
    currentUser: state.currentUser,
    updateUser: state.updateUser,
  }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      instagram: '',
      twitter: '',
    },
  });
  
  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
    }
  }, [currentUser, reset]);
  
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
      </div>
    );
  }

  const onSubmit = async (data: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateUser(data);
    toast.success('Profil başarıyla güncellendi!');
    navigate('/profil');
  };

  return (
    <div className="animate-fade-in-up py-12 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto bg-white dark:bg-gray-800/50 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center relative">
        <div className="absolute -top-16">
          <img src={currentUser.avatar} alt="Profil" className="w-28 h-28 rounded-full border-4 border-violet-400 dark:border-violet-500 shadow-xl bg-white" />
        </div>
        <div className="mt-16 w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent mb-2">Profili Düzenle</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Bilgilerini güncelle ve kendini daha iyi tanıt!</p>
          <div className="w-full flex flex-col gap-4 mb-6">
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                <input {...register('name')} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="Ad Soyad" />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
            </div>
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                <input {...register('email')} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="E-posta" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>
            <div>
              <div className="relative">
                <Info className="absolute left-3 top-3 text-violet-400 w-5 h-5" />
                <textarea {...register('bio')} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="Kısa Biyografi" rows={3} />
              </div>
            </div>
            <div>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                <input {...register('instagram')} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="Instagram Kullanıcı Adı" />
              </div>
            </div>
            <div>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                <input {...register('twitter')} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="Twitter Kullanıcı Adı" />
              </div>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-violet-600 to-amber-500 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-105 transition disabled:opacity-75 disabled:cursor-not-allowed">
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}; 