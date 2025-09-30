'use client';

import React from 'react';
import { Category, FilterState } from '../../types/blog';

interface FilterComponentProps {
  categories: Category[];
  filterState: FilterState;
  onFilterChange: (filterState: FilterState) => void;
  className?: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  categories,
  filterState,
  onFilterChange,
  className = ''
}) => {
  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({
      category: categoryId,
      subcategory: '' // Reset subcategory when category changes
    });
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    onFilterChange({
      ...filterState,
      subcategory: subcategoryId
    });
  };

  const selectedCategory = categories.find(cat => cat.id === filterState.category);
  const availableSubcategories = selectedCategory ? selectedCategory.subcategories : [];

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* Category Filter */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-[#AA1650] mb-2">
          Category
        </label>
        <select
          value={filterState.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-[#FBC158] rounded-lg focus:ring-2 focus:ring-[#FBC158] focus:border-transparent outline-none bg-white text-[#AA1650]"
          style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-[#AA1650] mb-2">
          Subcategory
        </label>
        <select
          value={filterState.subcategory}
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          disabled={!selectedCategory}
          className="w-full px-4 py-2 border border-[#FBC158] rounded-lg focus:ring-2 focus:ring-[#FBC158] focus:border-transparent outline-none bg-white text-[#AA1650] disabled:bg-gray-100 disabled:cursor-not-allowed"
          style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
        >
          <option value="">All Subcategories</option>
          {availableSubcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      {(filterState.category || filterState.subcategory) && (
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ category: '', subcategory: '' })}
            className="px-4 py-2 bg-[#AA1650] text-white rounded-lg hover:bg-[#8a1340] transition-colors duration-200 text-sm font-medium"
            style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;