'use client';

import React, { useState, useEffect } from 'react';
import BlogPanel from './BlogPanel';
import { fetchBlogsBanner, fetchMenuButtons, fetchBlogCategories } from '../../utils/api';
import { BlogBanner, MenuButton, ApiCategory } from '../../types/blog';

const BlogsPage: React.FC = () => {
  const [bannerData, setBannerData] = useState<BlogBanner | null>(null);
  const [menuButtons, setMenuButtons] = useState<MenuButton[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuLoading, setIsMenuLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setIsMenuLoading(true);
        setIsCategoriesLoading(true);
        
        // Load banner, menu and categories data in parallel
        const [bannerResponse, menuResponse, categoriesResponse] = await Promise.all([
          fetchBlogsBanner(),
          fetchMenuButtons(),
          fetchBlogCategories()
        ]);
        
        // Set banner data
        const activeBanner = bannerResponse.blogsBanners.find(banner => banner.is_active === 1);
        if (activeBanner) {
          setBannerData(activeBanner);
        }
        
        // Set menu buttons data (only active ones)
        const activeButtons = menuResponse.blogsMenuButtons.filter(button => button.is_active === 1);
        console.log('Menu buttons response:', menuResponse);
        console.log('Active buttons:', activeButtons);
        console.log('First button redirect_url:', activeButtons[0]?.redirect_url);
        setMenuButtons(activeButtons);
        
        // Set categories data (only active ones)
        const activeCategories = categoriesResponse.blogsCategories.filter(category => category.is_active === 1);
        setCategories(activeCategories);
        
      } catch (error) {
        console.error('Failed to load data:', error);
        // Keep default content if API fails
      } finally {
        setIsLoading(false);
        setIsMenuLoading(false);
        setIsCategoriesLoading(false);
      }
    };

    loadData();
  }, []);

  const handleButtonClick = (redirectUrl: string) => {
    console.log('handleButtonClick called with URL:', redirectUrl);
    console.log('URL type:', typeof redirectUrl);
    console.log('URL length:', redirectUrl?.length);
    
    if (redirectUrl && redirectUrl !== '#') {
      console.log('Attempting to open URL:', redirectUrl);
      try {
        const result = window.open(redirectUrl, '_blank', 'noopener,noreferrer');
        console.log('window.open result:', result);
        if (!result) {
          console.warn('window.open returned null - popup might be blocked');
          // Fallback: try to navigate in same window
          window.location.href = redirectUrl;
        }
      } catch (error) {
        console.error('Error opening URL:', error);
        // Fallback: try to navigate in same window
        window.location.href = redirectUrl;
      }
    } else {
      console.log('URL is empty or "#", not redirecting');
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
    >
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-[#FBC158]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-gray-300 rounded mb-4 max-w-md mx-auto"></div>
                <div className="h-6 bg-gray-300 rounded max-w-3xl mx-auto"></div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-[#AA1650] mb-4">
                  {bannerData?.title || 'Sunya IAS Blog'}
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {bannerData?.content || 
                    'Comprehensive educational resources for UPSC aspirants. Explore our carefully curated articles on various subjects to enhance your preparation for both Prelims and Mains examinations.'
                  }
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            {isMenuLoading ? (
              // Loading skeleton for buttons
              Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="h-12 w-40 bg-gray-300 rounded-full animate-pulse"
                ></div>
              ))
            ) : (
              menuButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => {
                    console.log('Button clicked:', button.name, 'URL:', button.redirect_url);
                    handleButtonClick(button.redirect_url);
                  }}
                  className="px-6 py-3 text-[#AA1650] font-medium rounded-full border-2 border-[#AA1650] hover:bg-[#AA1650] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FBC158] focus:ring-offset-2 cursor-pointer"
                  title={`Redirect to: ${button.redirect_url}`}
                >
                  {button.name}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Category Panels Layout */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        {isCategoriesLoading ? (
          // Loading skeleton for panels
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Array.from({ length: 2 }, (_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-[800px] animate-pulse"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
                <div className="p-6 space-y-4">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-8 ${
            categories.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 
            categories.length === 2 ? 'grid-cols-1 lg:grid-cols-2' :
            'grid-cols-1 lg:grid-cols-2'
          }`}>
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-[800px]"
              >
                <BlogPanel
                  title={category.name}
                  categoryId={category.id}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics Section */}
      {/* <div className="bg-[#AA1650] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#FBC158] mb-2">
                {dummyBlogs.length}+
              </div>
              <div className="text-lg">Total Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FBC158] mb-2">
                {categories.length}
              </div>
              <div className="text-lg">Subject Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FBC158] mb-2">
                {dummyBlogs.filter(blog => blog.type === 'prelims').length}
              </div>
              <div className="text-lg">Prelims Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FBC158] mb-2">
                {dummyBlogs.filter(blog => blog.type === 'mains').length}
              </div>
              <div className="text-lg">Mains Articles</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Featured Categories */}
      {/* <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#AA1650] mb-4">
              Subject Categories
            </h2>
            <p className="text-lg text-gray-600">
              Explore articles organized by key UPSC subjects
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gradient-to-br from-[#AA1650] to-[#8a1340] text-white p-6 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#FBC158] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90">
                  {category.subcategories.length} subcategories
                </p>
                <div className="mt-4 text-[#FBC158] text-sm">
                  {dummyBlogs.filter(blog => blog.categoryId === category.id).length} articles
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BlogsPage;