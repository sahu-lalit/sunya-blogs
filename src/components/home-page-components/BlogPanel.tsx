'use client';

import React, { useState, useMemo } from 'react';
import { Blog, Category, FilterState } from '../../types/blog';
import BlogCard from './BlogCard';
import BlogCardList from './BlogCardList';
import FilterComponent from './FilterComponent';
import LayoutToggle, { LayoutType } from './LayoutToggle';
import { FaSearch, FaFilter } from 'react-icons/fa';

interface BlogPanelProps {
  title: string;
  blogs: Blog[];
  categories: Category[];
  type: 'prelims' | 'mains';
  className?: string;
}

const BlogPanel: React.FC<BlogPanelProps> = ({
  title,
  blogs,
  categories,
  type,
  className = ''
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    category: '',
    subcategory: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [layoutType, setLayoutType] = useState<LayoutType>('grid');

  // Filter blogs based on type, search term, and filters
  const filteredBlogs = useMemo(() => {
    let filtered = blogs.filter(blog => blog.type === type);

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterState.category) {
      filtered = filtered.filter(blog => blog.categoryId === filterState.category);
    }

    // Apply subcategory filter
    if (filterState.subcategory) {
      filtered = filtered.filter(blog => blog.subcategoryId === filterState.subcategory);
    }

    return filtered;
  }, [blogs, type, searchTerm, filterState]);

  const handleBlogClick = (blog: Blog) => {
    // Here you can implement navigation to detailed blog view
    console.log('Blog clicked:', blog.title);
  };

  const clearAllFilters = () => {
    setFilterState({ category: '', subcategory: '' });
    setSearchTerm('');
  };

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Panel Header */}
      <div className="bg-white border-b border-[#FBC158] p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="text-2xl font-bold text-[#AA1650]"
            style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
          >
            {title}
          </h2>
          <div className="flex items-center gap-3">
            {/* <span className="text-sm text-gray-600">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
            </span> */}
            <LayoutToggle
              currentLayout={layoutType}
              onLayoutChange={setLayoutType}
              className="hidden sm:flex"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2 text-[#AA1650] hover:bg-[#FBC158] hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <FaFilter />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()} articles...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[#FBC158] rounded-lg focus:ring-2 focus:ring-[#FBC158] focus:border-transparent outline-none"
            style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
          />
        </div>

        {/* Mobile Layout Toggle */}
        <div className="sm:hidden mb-4">
          <LayoutToggle
            currentLayout={layoutType}
            onLayoutChange={setLayoutType}
            className="w-fit"
          />
        </div>

        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterComponent
            categories={categories}
            filterState={filterState}
            onFilterChange={setFilterState}
          />
        </div>

        {/* Active Filters Summary */}
        {(filterState.category || filterState.subcategory || searchTerm) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="bg-[#AA1650] text-white px-2 py-1 rounded-full text-xs">
                Search: &quot;{searchTerm}&quot;
              </span>
            )}
            {filterState.category && (
              <span className="bg-[#FBC158] text-[#AA1650] px-2 py-1 rounded-full text-xs font-medium">
                {categories.find(c => c.id === filterState.category)?.name}
              </span>
            )}
            {filterState.subcategory && (
              <span className="bg-[#FBC158] text-[#AA1650] px-2 py-1 rounded-full text-xs font-medium">
                {categories
                  .find(c => c.id === filterState.category)
                  ?.subcategories.find(s => s.id === filterState.subcategory)?.name}
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#AA1650] hover:text-[#8a1340] underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Blog Grid/List - Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredBlogs.length > 0 ? (
          <div className={
            layoutType === 'grid' 
              ? "grid grid-cols-1 lg:grid-cols-2 gap-6" 
              : "space-y-3"
          }>
            {filteredBlogs.map((blog) => (
              layoutType === 'grid' ? (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onClick={handleBlogClick}
                  className="h-fit"
                />
              ) : (
                <BlogCardList
                  key={blog.id}
                  blog={blog}
                  onClick={handleBlogClick}
                />
              )
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium mb-2">No articles found</h3>
            <p className="text-sm text-center">
              {searchTerm || filterState.category || filterState.subcategory
                ? 'Try adjusting your search or filters to find more articles.'
                : `No ${title.toLowerCase()} articles available at the moment.`}
            </p>
            {(searchTerm || filterState.category || filterState.subcategory) && (
              <button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 bg-[#AA1650] text-white rounded-lg hover:bg-[#8a1340] transition-colors text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPanel;