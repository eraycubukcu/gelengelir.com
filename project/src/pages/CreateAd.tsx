import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Clock, MapPin, Users, Tag, Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useAdStore } from '../store/useAdStore';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateAdForm } from '../types';

const createAdSchema = z.object({
  title: z.string().min(5, { message: 'Başlık en az 5 karakter olmalıdır.' }),
  categoryId: z.string({ required_error: 'Lütfen bir kategori seçin.' }),
  description: z.string().min(20, { message: 'Açıklama en az 20 karakter olmalıdır.' }),
  location: z.string().min(3, { message: 'Konum zorunludur.' }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Geçerli bir tarih seçin.' }),
  time: z.string().optional(),
  maxParticipants: z.coerce.number().min(2, { message: 'En az 2 katılımcı olmalıdır.' }),
  tags: z.array(z.string()).optional(),
});

export const CreateAd: React.FC = () => {
  const navigate = useNavigate();
  const { categories, addAd, currentUser } = useAdStore((state) => ({
    categories: state.categories,
    addAd: state.addAd,
    currentUser: state.currentUser,
  }));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateAdForm>({
    resolver: zodResolver(createAdSchema),
    defaultValues: {
      maxParticipants: 2,
      tags: [],
    },
  });

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
      </div>
    );
  }

  const selectedCategoryId = watch('categoryId');
  const currentTags = watch('tags') || [];

  const onSubmit = async (data: CreateAdForm) => {
    const selectedCategory = categories.find((c) => c.id === data.categoryId);
    if (!selectedCategory) return; // Should not happen with zod

    await new Promise(resolve => setTimeout(resolve, 1000));

    addAd({
      ...data,
      category: selectedCategory,
    });
    toast.success('İlan başarıyla oluşturuldu!');
    navigate('/');
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !currentTags.includes(tag.trim())) {
      setValue('tags', [...currentTags, tag.trim()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
          <div className="space-y-6 sm:space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                İlan Başlığı *
              </label>
              <input
                {...register('title', { required: 'İlan başlığı zorunludur.' })}
                type="text"
                placeholder="Örn : Okeye 4. kişiyi arıyoruz"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-3 sm:mb-4">
                Kategori *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {categories.map((category) => {
                  const IconComponent = (Icons as any)[category.icon] || Icons.Sparkles;
                  return (
                    <label
                      key={category.id}
                      className={`relative flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedCategoryId === category.id
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <input
                        {...register('categoryId', { required: 'Kategori seçiniz' })}
                        type="radio"
                        value={category.id}
                        className="sr-only"
                      />
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 ${category.color}`}>
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-200 text-center">{category.name}</span>
                    </label>
                  );
                })}
              </div>
              {errors.categoryId && (
                <p className="mt-2 text-sm text-red-600">{errors.categoryId.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Açıklama *
              </label>
              <textarea
                {...register('description', { required: 'Açıklama gereklidir' })}
                rows={4}
                placeholder="Aktivitenizi detaylı bir şekilde açıklayın..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Location, Date, Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Konum *
                </label>
                <input
                  {...register('location', { required: 'Konum gereklidir' })}
                  type="text"
                  placeholder="Örn: Kadıköy, İstanbul"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Tarih *
                </label>
                <input
                  {...register('date', { required: 'Tarih gereklidir' })}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Saat
                </label>
                <input
                  {...register('time')}
                  type="time"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Max Participants */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Katılımcı Sayısı *
              </label>
              <input
                  {...register('maxParticipants', { required: 'Katılımcı sayısı gereklidir' })}
                  type="number"
                  min="0"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base"
                />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                <Tag className="inline w-4 h-4 mr-1" />
                Etiketler
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {currentTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 sm:ml-2 text-indigo-400 hover:text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-100"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Etiket ekleyip Enter'a basın"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700/50 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm sm:text-base"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 sm:pt-6">
              <div className="flex items-center mt-6 sm:mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg hover:scale-105 transition disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> {isSubmitting ? 'Oluşturuluyor...' : 'İlanı Oluştur'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};