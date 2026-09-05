'use client';

import React from 'react';
import { CATEGORIES } from '@data/mockData';
import { CategoryFilter as CategoryFilterType } from '@/types';

interface CategoryFilterProps {
  selectedCategory: CategoryFilterType;
  onSelectCategory: (category: CategoryFilterType) => void;
  itemsCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  itemsCounts,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 min-w-max pb-1">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          const count = itemsCounts[category] ?? 0;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category as CategoryFilterType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${
                isSelected
                  ? 'bg-brand text-white shadow-lg shadow-brand/30 scale-105'
                  : 'bg-surface hover:bg-surfaceHover text-gray-300 hover:text-white border border-borderDark/60'
              }`}
            >
              <span>{category}</span>
              {count > 0 && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-background text-gray-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
