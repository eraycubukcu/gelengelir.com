import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Send, User, Mail, MessageSquare, Phone, MapPin, Clock, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export const Contact: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    toast.success('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-400px)] p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="max-w-5xl w-full grid lg:grid-cols-3 gap-4 sm:gap-6 bg-white dark:bg-gray-800/50 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8 overflow-hidden">
        
        {/* Sol Taraf: İletişim Bilgileri */}
        <div className="lg:col-span-1 flex flex-col justify-center space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent mb-2 sm:mb-3">
              Bize Ulaşın
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
              Her türlü soru, öneri veya geri bildiriminiz için buradayız.
            </p>
          </div>

          {/* İletişim Bilgileri */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center p-2.5 sm:p-3 bg-gradient-to-r from-violet-50 to-amber-50 dark:from-violet-900/20 dark:to-amber-900/20 rounded-xl border border-violet-200 dark:border-violet-800">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full flex items-center justify-center mr-2.5 sm:mr-3 flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">E-posta</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm break-all">destek@gelengelir.com</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">24 saat içinde yanıt</p>
              </div>
            </div>

            <div className="flex items-center p-2.5 sm:p-3 bg-gradient-to-r from-violet-50 to-amber-50 dark:from-violet-900/20 dark:to-amber-900/20 rounded-xl border border-violet-200 dark:border-violet-800">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full flex items-center justify-center mr-2.5 sm:mr-3 flex-shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">Telefon</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">+90 (212) 555 0123</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Pazartesi - Cuma 09:00-18:00</p>
              </div>
            </div>

            <div className="flex items-center p-2.5 sm:p-3 bg-gradient-to-r from-violet-50 to-amber-50 dark:from-violet-900/20 dark:to-amber-900/20 rounded-xl border border-violet-200 dark:border-violet-800">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full flex items-center justify-center mr-2.5 sm:mr-3 flex-shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">Adres</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">İstanbul, Türkiye</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Merkez Ofis</p>
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-xs sm:text-sm">Sosyal Medya</h3>
            <div className="flex space-x-2">
              <a href="#" className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href="#" className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href="#" className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a href="#" className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Sağ Taraf: Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-4 h-4" />
                <input
                  {...register('name', { required: true })}
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full pl-10 pr-3 sm:pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 dark:focus:border-violet-400 transition-all duration-200 text-sm"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 w-4 h-4" />
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  placeholder="E-posta Adresiniz"
                  className="w-full pl-10 pr-3 sm:pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 dark:focus:border-violet-400 transition-all duration-200 text-sm"
                />
              </div>
            </div>
            
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 sm:top-4 text-violet-400 w-4 h-4" />
              <textarea
                {...register('message', { required: true })}
                placeholder="Mesajınızı buraya yazın..."
                rows={4}
                className="w-full pl-10 pr-3 sm:pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 dark:focus:border-violet-400 transition-all duration-200 resize-none text-sm"
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-violet-700 hover:to-amber-600"
            >
              <Send className="w-4 h-4" /> 
              Mesaj Gönder
            </button>
            
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              Mesajınızı gönderdikten sonra en kısa sürede size dönüş yapacağız.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}; 