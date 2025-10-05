'use client';

import React from 'react';
import Image from 'next/image';
import { Blog } from '../../types/blog';
import { FaClock, FaUser, FaCalendarAlt, FaStar } from 'react-icons/fa';

interface BlogCardListProps {
  blog: Blog;
  onClick?: (blog: Blog) => void;
  className?: string;
}

const BlogCardList: React.FC<BlogCardListProps> = ({ blog, onClick, className = '' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(blog);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-[#FBC158] flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 min-h-[140px] ${className}`}
      onClick={handleClick}
      style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
    >
      {/* Blog Image */}
      <div className="relative w-full sm:w-32 h-32 sm:h-24 flex-shrink-0">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover rounded-lg"
          priority={false}
        />
        {blog.isPopular && (
          <div className="absolute -top-2 -right-2 bg-[#FBC158] text-[#AA1650] px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <FaStar className="w-3 h-3" />
          </div>
        )}
        <div className="absolute top-1 left-1 bg-[#AA1650] text-white px-2 py-1 rounded-full text-xs font-medium">
          {blog.type.charAt(0).toUpperCase() + blog.type.slice(1)}
        </div>
      </div>

      {/* Blog Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Title */}
          <h3 className="text-lg font-bold text-[#AA1650] mb-2 line-clamp-2 hover:text-[#8a1340] transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        <div className="space-y-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {blog.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="bg-[#FBC158] bg-opacity-20 text-[#AA1650] px-2 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 2 && (
              <span className="text-gray-400 text-xs self-center">+{blog.tags.length - 2}</span>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FaUser className="w-3 h-3" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              <span>{blog.readTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="w-3 h-3" />
              <span>{formatDate(blog.publishedDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Read More Button */}
      <div className="flex-shrink-0 flex items-end sm:items-end justify-start sm:justify-center mt-2 sm:mt-0">
        <button className="bg-[#AA1650] text-white py-2 px-4 rounded-lg hover:bg-[#8a1340] transition-colors duration-200 text-sm font-medium whitespace-nowrap w-full sm:w-auto">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCardList;