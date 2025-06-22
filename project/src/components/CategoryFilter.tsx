import React from 'react';
import * as Icons from 'lucide-react';
import { useAdStore } from '../store/useAdStore';
import { Filter, Sparkles } from 'lucide-react';

export const CategoryFilter: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useAdStore((state) => ({
    categories: state.categories,
    selectedCategory: state.selectedCategory,
    setSelectedCategory: state.setSelectedCategory,
  }));

  return (
    <div className="mb-4 sm:mb-6">
      {/* Filter Header */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-violet-100 to-amber-100 dark:from-violet-900/20 dark:to-amber-900/20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-violet-200 dark:border-violet-800">
          <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-600 dark:text-violet-400 animate-pulse" />
          <span className="font-medium text-xs sm:text-sm text-violet-800 dark:text-violet-300">Kategori Filtrele</span>
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 animate-bounce" />
        </div>
      </div>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-1 sm:gap-1.5 ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-violet-600 to-amber-500 text-white shadow-md scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-amber-50 dark:hover:from-violet-900/20 dark:hover:to-amber-900/20 border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600'
          }`}
        >
          <span className="text-xs sm:text-sm">🌟</span>
          <span>Tümü</span>
          {selectedCategory === null && (
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </button>
        
        {categories.map((category, index) => {
          const IconComponent = (Icons as any)[category.icon] || Icons.Sparkles;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-1 sm:gap-1.5 animate-fade-in-up`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-md scale-105`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-violet-50 hover:to-amber-50 dark:hover:from-violet-900/20 dark:hover:to-amber-900/20 border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600'
              } px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 flex items-center gap-1 sm:gap-1.5`}>
                <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{category.name}</span>
                {selectedCategory === category.id && (
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Active Filter Indicator */}
      {selectedCategory && (
        <div className="mt-2 sm:mt-3 text-center">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-green-200 dark:border-green-800 animate-fade-in-up">
            <span className="text-green-600 dark:text-green-400 text-xs sm:text-sm">🎯</span>
            <span className="font-medium text-xs sm:text-sm text-green-800 dark:text-green-300">
              Aktif: {categories.find(c => c.id === selectedCategory)?.name}
            </span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors text-xs sm:text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};