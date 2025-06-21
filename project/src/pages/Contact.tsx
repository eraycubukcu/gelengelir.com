import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Send, User, Mail, MessageSquare } from 'lucide-react';

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export const Contact: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    toast.success('Mesajınız başarıyla gönderildi!');
    reset();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 bg-white dark:bg-gray-800/50 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 sm:p-12 overflow-hidden">
        {/* Sol Taraf: Bilgi */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent mb-4">
            Bize Ulaşın
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Her türlü soru, öneri veya geri bildiriminiz için buradayız. Aşağıdaki formu doldurarak bize kolayca ulaşabilirsiniz.
          </p>
          <div className="space-y-4">
            <p className="flex items-center text-gray-700 dark:text-gray-200">
              <Mail className="w-5 h-5 mr-3 text-violet-500" />
              <span>destek@gelengelir.com</span>
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Genellikle 24 saat içinde yanıt veriyoruz.
            </p>
          </div>
        </div>

        {/* Sağ Taraf: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Adınız"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
            <input
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              type="email"
              placeholder="E-posta Adresiniz"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-5 text-violet-400 w-5 h-5" />
            <textarea
              {...register('message', { required: true })}
              placeholder="Mesajınız"
              rows={5}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition"
          >
            <Send className="w-5 h-5" /> Gönder
          </button>
        </form>
      </div>
    </div>
  );
}; 