'use client';

import React from 'react';
import Image from 'next/image';
import { Blog } from '../../types/blog';
import { FaClock, FaUser, FaCalendarAlt, FaStar } from 'react-icons/fa';

interface BlogCardProps {
  blog: Blog;
  onClick?: (blog: Blog) => void;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick, className = '' }) => {
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
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-[#FBC158] ${className}`}
      onClick={handleClick}
      style={{ fontFamily: 'Poppins-Medium, sans-serif' }}
    >
      {/* Blog Image - Only render if imageUrl exists */}
      {blog.imageUrl && blog.imageUrl.trim() !== '' && (
        <div className="relative h-48 w-full">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover rounded-t-lg"
            priority={false}
          />
          {blog.isPopular && (
            <div className="absolute top-3 right-3 bg-[#FBC158] text-[#AA1650] px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaStar className="w-3 h-3" />
              Popular
            </div>
          )}
          <div className="absolute top-3 left-3 bg-[#AA1650] text-white px-3 py-1 rounded-full text-xs font-medium">
            {blog.type.charAt(0).toUpperCase() + blog.type.slice(1)}
          </div>
        </div>
      )}

      {/* Header section for cards without images */}
      {(!blog.imageUrl || blog.imageUrl.trim() === '') && (
        <div className="p-5 pb-2">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#AA1650] text-white px-3 py-1 rounded-full text-xs font-medium">
              {blog.type.charAt(0).toUpperCase() + blog.type.slice(1)}
            </div>
            {blog.isPopular && (
              <div className="bg-[#FBC158] text-[#AA1650] px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <FaStar className="w-3 h-3" />
                Popular
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className={blog.imageUrl && blog.imageUrl.trim() !== '' ? "p-5" : "px-5 pb-5"}>
        {/* Title */}
        <h3 className="text-lg font-bold text-[#AA1650] mb-2 line-clamp-2 hover:text-[#8a1340] transition-colors">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaUser className="w-3 h-3" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            <span>{formatDate(blog.publishedDate)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-[#FBC158] bg-opacity-20 text-[#AA1650] px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="text-gray-400 text-xs">+{blog.tags.length - 3} more</span>
          )}
        </div>

        {/* Read More Button */}
        <button className="w-full bg-[#AA1650] text-white py-2 px-4 rounded-lg hover:bg-[#8a1340] transition-colors duration-200 text-sm font-medium">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;