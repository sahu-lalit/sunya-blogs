'use client';

import React from 'react';
import BlogPanel from './BlogPanel';
import { categories, dummyBlogs } from '../../data/blogData';

const BlogsPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
    >
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-[#FBC158]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#AA1650] mb-4">
              Sunya IAS Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive educational resources for UPSC aspirants. Explore our carefully curated 
              articles on various subjects to enhance your preparation for both Prelims and Mains examinations.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 text-[#AA1650] font-medium rounded-full border-2 border-[#AA1650] hover:bg-[#AA1650] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FBC158] focus:ring-offset-2">
              Current Affairs
            </button>
            <button className="px-6 py-3 text-[#AA1650] font-medium rounded-full border-2 border-[#AA1650] hover:bg-[#AA1650] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FBC158] focus:ring-offset-2">
              History & Culture
            </button>
            <button className="px-6 py-3 text-[#AA1650] font-medium rounded-full border-2 border-[#AA1650] hover:bg-[#AA1650] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FBC158] focus:ring-offset-2">
              Geography
            </button>
            <button className="px-6 py-3 text-[#AA1650] font-medium rounded-full border-2 border-[#AA1650] hover:bg-[#AA1650] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FBC158] focus:ring-offset-2">
              Polity & Governance
            </button>
            <button className="px-6 py-3 text-[#AA1650] font-medium rounded-full border-2 border-[#AA1650] hover:bg-[#AA1650] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FBC158] focus:ring-offset-2">
              Economy
            </button>
            <button className="px-6 py-3 text-[#AA1650] font-medium rounded-full border-2 border-[#AA1650] hover:bg-[#AA1650] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FBC158] focus:ring-offset-2">
              Science & Technology
            </button>
          </div>
        </div>
      </div>

      {/* Two Panel Layout */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prelims Panel */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-[800px]">
            <BlogPanel
              title="Prelims Articles"
              blogs={dummyBlogs}
              categories={categories}
              type="prelims"
              className="h-full"
            />
          </div>

          {/* Mains Panel */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-[800px]">
            <BlogPanel
              title="Mains Articles"
              blogs={dummyBlogs}
              categories={categories}
              type="mains"
              className="h-full"
            />
          </div>
        </div>
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