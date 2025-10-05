'use client';

import React from 'react';
import { FaTh, FaList } from 'react-icons/fa';

export type LayoutType = 'grid' | 'list';

interface LayoutToggleProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  className?: string;
}

const LayoutToggle: React.FC<LayoutToggleProps> = ({
  currentLayout,
  onLayoutChange,
  className = ''
}) => {
  return (
    <div className={`flex items-center bg-gray-100 rounded-lg p-1 ${className}`}>
      <button
        onClick={() => onLayoutChange('grid')}
        className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 ${
          currentLayout === 'grid'
            ? 'bg-[#AA1650] text-white shadow-sm'
            : 'text-gray-600 hover:text-[#AA1650] hover:bg-white'
        }`}
        title="Grid view"
      >
        <FaTh className="w-4 h-4" />
      </button>
      <button
        onClick={() => onLayoutChange('list')}
        className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 ${
          currentLayout === 'list'
            ? 'bg-[#AA1650] text-white shadow-sm'
            : 'text-gray-600 hover:text-[#AA1650] hover:bg-white'
        }`}
        title="List view"
      >
        <FaList className="w-4 h-4" />
      </button>
    </div>
  );
};

export default LayoutToggle;