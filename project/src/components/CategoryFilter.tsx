import React from 'react';
import * as Icons from 'lucide-react';
import { useAdStore } from '../store/useAdStore';

export const CategoryFilter: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useAdStore((state) => ({
    categories: state.categories,
    selectedCategory: state.selectedCategory,
    setSelectedCategory: state.setSelectedCategory,
  }));

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-violet-600 to-amber-500 text-white shadow-md'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
        }`}
      >
        Tümü
      </button>
      {categories.map((category) => {
        const IconComponent = (Icons as any)[category.icon] || Icons.Sparkles;
        return (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-2 ${
              selectedCategory === category.id
                ? `${category.color} text-white shadow-md`
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <IconComponent className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};