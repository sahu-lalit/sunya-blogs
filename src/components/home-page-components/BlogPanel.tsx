'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Blog, ApiSubcategory } from '../../types/blog';
import BlogCard from './BlogCard';
import BlogCardList from './BlogCardList';
import LayoutToggle, { LayoutType } from './LayoutToggle';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { fetchBlogSubcategories, fetchBlogArticles, convertApiBlogToBlog } from '../../utils/api';

interface BlogPanelProps {
  title: string;
  categoryId: number;
  className?: string;
}

const BlogPanel: React.FC<BlogPanelProps> = ({
  title,
  categoryId,
  className = ''
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [layoutType, setLayoutType] = useState<LayoutType>('grid');
  const [subcategories, setSubcategories] = useState<ApiSubcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [isSubcategoriesLoading, setIsSubcategoriesLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isBlogsLoading, setIsBlogsLoading] = useState(true);

  // Fetch subcategories and initial blogs when categoryId changes
  useEffect(() => {
    const loadData = async () => {
      if (categoryId) {
        try {
          setIsSubcategoriesLoading(true);
          setIsBlogsLoading(true);
          
          // Load subcategories and blogs in parallel
          const [subcategoriesResponse, blogsResponse] = await Promise.all([
            fetchBlogSubcategories(categoryId),
            fetchBlogArticles(categoryId)
          ]);
          
          // Set subcategories
          const activeSubcategories = subcategoriesResponse.blogsSubCategories.filter(sub => sub.is_active === 1);
          setSubcategories(activeSubcategories);
          
          // Convert and set blogs
          const convertedBlogs = blogsResponse.responseResult
            .filter(article => article.is_active === 1)
            .map(convertApiBlogToBlog);
          setBlogs(convertedBlogs);
          
        } catch (error) {
          console.error('Failed to load data:', error);
          setSubcategories([]);
          setBlogs([]);
        } finally {
          setIsSubcategoriesLoading(false);
          setIsBlogsLoading(false);
        }
      }
    };

    loadData();
  }, [categoryId]);

  // Fetch filtered blogs when subcategory changes
  useEffect(() => {
    const loadFilteredBlogs = async () => {
      if (categoryId && selectedSubcategory) {
        try {
          setIsBlogsLoading(true);
          const blogsResponse = await fetchBlogArticles(categoryId, parseInt(selectedSubcategory));
          
          // Convert and set blogs
          const convertedBlogs = blogsResponse.responseResult
            .filter(article => article.is_active === 1)
            .map(convertApiBlogToBlog);
          setBlogs(convertedBlogs);
          
        } catch (error) {
          console.error('Failed to load filtered blogs:', error);
          setBlogs([]);
        } finally {
          setIsBlogsLoading(false);
        }
      } else if (categoryId && !selectedSubcategory) {
        // If no subcategory selected, reload all blogs for the category
        const loadAllBlogs = async () => {
          try {
            setIsBlogsLoading(true);
            const blogsResponse = await fetchBlogArticles(categoryId);
            
            const convertedBlogs = blogsResponse.responseResult
              .filter(article => article.is_active === 1)
              .map(convertApiBlogToBlog);
            setBlogs(convertedBlogs);
            
          } catch (error) {
            console.error('Failed to load all blogs:', error);
            setBlogs([]);
          } finally {
            setIsBlogsLoading(false);
          }
        };
        
        loadAllBlogs();
      }
    };

    loadFilteredBlogs();
  }, [categoryId, selectedSubcategory]);

  // Filter blogs based on search term only (subcategory filtering is done by API)
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [blogs, searchTerm]);

  const handleBlogClick = (blog: Blog) => {
    // Navigate to article detail page
    router.push(`/article/${blog.id}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSubcategory('');
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
            <span className="text-sm text-gray-600">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
            </span>
            <LayoutToggle
              currentLayout={layoutType}
              onLayoutChange={setLayoutType}
              className="hidden sm:flex"
            />
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

        {/* Subcategory Dropdown */}
        {!isSubcategoriesLoading && subcategories.length > 0 && (
          <div className="relative mb-4">
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full px-4 py-3 border border-[#FBC158] rounded-lg focus:ring-2 focus:ring-[#FBC158] focus:border-transparent outline-none bg-white appearance-none pr-10"
              style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
            >
              <option value="">All Subcategories</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id.toString()}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        )}

        {/* Subcategory Loading */}
        {isSubcategoriesLoading && (
          <div className="mb-4">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        )}

        {/* Mobile Layout Toggle */}
        <div className="sm:hidden mb-4">
          <LayoutToggle
            currentLayout={layoutType}
            onLayoutChange={setLayoutType}
            className="w-fit"
          />
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedSubcategory) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="bg-[#AA1650] text-white px-2 py-1 rounded-full text-xs">
                Search: &quot;{searchTerm}&quot;
              </span>
            )}
            {selectedSubcategory && (
              <span className="bg-[#FBC158] text-[#AA1650] px-2 py-1 rounded-full text-xs font-medium">
                {subcategories.find(sub => sub.id.toString() === selectedSubcategory)?.name}
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
        {isBlogsLoading ? (
          // Loading skeleton for blogs
          <div className={
            layoutType === 'grid' 
              ? "grid grid-cols-1 lg:grid-cols-2 gap-6" 
              : "space-y-3"
          }>
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className={
                  layoutType === 'grid'
                    ? "bg-white rounded-lg shadow-md p-6 h-64 animate-pulse"
                    : "bg-white rounded-lg shadow-md p-4 h-24 animate-pulse"
                }
              >
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
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
              {searchTerm || selectedSubcategory
                ? 'Try adjusting your search or filters to find more articles.'
                : `No ${title.toLowerCase()} articles available at the moment.`}
            </p>
            {(searchTerm || selectedSubcategory) && (
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