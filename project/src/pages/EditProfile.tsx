import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdStore } from '../store/useAdStore';
import { toast } from 'react-hot-toast';
import { User, Mail, Info, Instagram, Twitter } from 'lucide-react';

export const EditProfile: React.FC = () => {
  const { currentUser, updateUser } = useAdStore((state) => ({
    currentUser: state.currentUser,
    updateUser: state.updateUser,
  }));

  const [form, setForm] = useState(currentUser);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(form);
    toast.success('Profil başarıyla güncellendi!');
    setTimeout(() => {
      navigate('/profil');
    }, 1200);
  };

  return (
    <div className="animate-fade-in-up py-12">
      <form onSubmit={handleSubmit} className="max-w-lg w-full bg-white dark:bg-gray-800/50 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 flex flex-col items-center relative">
        <div className="absolute -top-16">
          <img src={form.avatar} alt="Profil" className="w-28 h-28 rounded-full border-4 border-violet-400 dark:border-violet-500 shadow-xl bg-white" />
        </div>
        <div className="mt-16 w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent mb-2">Profili Düzenle</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Bilgilerini güncelle ve kendini daha iyi tanıt!</p>
          <div className="w-full flex flex-col gap-4 mb-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="Ad Soyad" required />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="E-posta" required />
            </div>
            <div className="relative">
              <Info className="absolute left-3 top-3 text-violet-400 w-5 h-5" />
              <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="Kısa Biyografi" rows={3} />
            </div>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
              <input type="text" name="instagram" value={form.instagram} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="Instagram Kullanıcı Adı" />
            </div>
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
              <input type="text" name="twitter" value={form.twitter} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border rounded bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-300" placeholder="Twitter Kullanıcı Adı" />
            </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-amber-500 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-105 transition">Kaydet</button>
        </div>
      </form>
    </div>
  );
}; 