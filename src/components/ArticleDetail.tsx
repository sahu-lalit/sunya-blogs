'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { fetchSingleBlogArticle } from '../utils/api';
import { SingleBlogArticle } from '../types/blog';
import { FaClock, FaUser, FaCalendarAlt, FaStar, FaArrowLeft, FaYoutube } from 'react-icons/fa';

interface ArticleDetailProps {
  articleId: number;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId }) => {
  const router = useRouter();
  const [article, setArticle] = useState<SingleBlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchSingleBlogArticle(articleId);
        setArticle(response.blogsArticle);
      } catch (error) {
        console.error('Failed to load article:', error);
        setError('Failed to load article. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins-Medium, sans-serif' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="h-12 bg-gray-300 rounded mb-4"></div>
            <div className="flex gap-4 mb-6">
              <div className="h-6 bg-gray-300 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-24"></div>
              <div className="h-6 bg-gray-300 rounded w-28"></div>
            </div>
            <div className="h-64 bg-gray-300 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ fontFamily: 'Poppins-Medium, sans-serif' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-[#AA1650] mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The article you are looking for does not exist.'}</p>
          <button
            onClick={handleBack}
            className="bg-[#AA1650] text-white px-6 py-3 rounded-lg hover:bg-[#8a1340] transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins-Medium, sans-serif' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#AA1650] hover:text-[#8a1340] transition-colors duration-200 mb-6 font-medium"
        >
          <FaArrowLeft />
          Back to Articles
        </button>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-[#AA1650] text-white px-3 py-1 rounded-full text-sm font-medium">
              {article.blogsCategory.name}
            </span>
            <span className="bg-[#FBC158] text-[#AA1650] px-3 py-1 rounded-full text-sm font-medium">
              {article.blogsSubCategory.name}
            </span>
            {article.setPopular === 1 && (
              <span className="bg-[#FBC158] text-[#AA1650] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <FaStar className="w-3 h-3" />
                Popular
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#AA1650] mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <FaUser className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4" />
              <span>{article.minuteRead} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4" />
              <span>Published</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tagObj, index) => (
                <span
                  key={index}
                  className="bg-[#FBC158] bg-opacity-20 text-[#AA1650] px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tagObj.tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Article Images */}
        {article.images.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {article.images.map((image, index) => (
                <div key={image.id} className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={`https://admin.sunyaiashindi.com/${image.url}`}
                    alt={`${article.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YouTube Video */}
        {article.youtubeVideoLink && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaYoutube className="text-red-600 w-5 h-5" />
                <h3 className="text-lg font-bold text-[#AA1650]">Related Video</h3>
              </div>
              <div className="aspect-video">
                <iframe
                  src={article.youtubeVideoLink.replace('watch?v=', 'embed/')}
                  title={article.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-[#AA1650] 
              prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
              prose-h3:text-xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-6
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-[#AA1650] prose-strong:font-bold
              prose-a:text-[#AA1650] hover:prose-a:text-[#8a1340] prose-a:font-medium
              prose-ul:my-6 prose-ol:my-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-[#FBC158] prose-blockquote:bg-[#FBC158] prose-blockquote:bg-opacity-10 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-[#AA1650]
            "
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Related Articles Section - Placeholder */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-[#AA1650] mb-6">Related Articles</h3>
          <p className="text-gray-600">More articles from {article.blogsCategory.name} coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;