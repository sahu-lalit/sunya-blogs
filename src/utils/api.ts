// API utility functions for the Sunya IAS application
import { API_ENDPOINTS } from './constants';
import { BlogBannerResponse, MenuButtonsResponse, ApiCategoryResponse, ApiSubcategoryResponse, ApiBlogArticlesResponse, ApiBlogArticle, Blog, SingleArticleResponse } from '../types/blog';

interface SubscriptionEnquiryForm {
  name: string;
  email: string;
  mobileNumber: string;
}

interface ApiResponse {
  message: string;
  success: boolean;
}

// Mock API function for subscription enquiry
// In a real application, this would make an actual HTTP request to your backend
export async function sendSubscriptionEnquiry(formData: SubscriptionEnquiryForm): Promise<ApiResponse> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!formData.name || !formData.email || !formData.mobileNumber) {
      throw new Error('All fields are required');
    }
    
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      throw new Error('Please enter a valid 10-digit mobile number');
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }
    
    // TODO: Replace this with actual API call
    // const response = await fetch('/api/subscription-enquiry', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Failed to submit enquiry');
    // }
    // 
    // return await response.json();
    
    // Mock successful response
    return {
      message: "Thank you for your enquiry! Our admission team will contact you soon.",
      success: true
    };
    
  } catch (error) {
    // Re-throw with proper error structure
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Something went wrong. Please try again.');
  }
}

// Fetch blogs banner content for the page header
export async function fetchBlogsBanner(): Promise<BlogBannerResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.BLOGS_BANNER);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: BlogBannerResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs banner:', error);
    // Return fallback data in case of error
    return {
      blogsBanners: [{
        id: 1,
        title: "Sunya IAS Blog",
        content: "Comprehensive educational resources for UPSC aspirants. Explore our carefully curated articles on various subjects to enhance your preparation for both Prelims and Mains examinations.",
        is_active: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }],
      status: 200
    };
  }
}

// Fetch menu buttons for navigation
export async function fetchMenuButtons(): Promise<MenuButtonsResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.MENU_BUTTONS);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: MenuButtonsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu buttons:', error);
    // Return fallback data in case of error
    return {
      blogsMenuButtons: [
        { id: 1, name: "Current Affairs", redirect_url: "#", is_active: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 2, name: "History & Culture", redirect_url: "#", is_active: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 3, name: "Geography", redirect_url: "#", is_active: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 4, name: "Polity & Governance", redirect_url: "#", is_active: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 5, name: "Economy", redirect_url: "#", is_active: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 6, name: "Science & Technology", redirect_url: "#", is_active: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      ],
      status: 200
    };
  }
}

// Helper function to convert API article to Blog interface
export function convertApiBlogToBlog(apiArticle: ApiBlogArticle): Blog {
  // Extract tags as simple string array
  const tags = apiArticle.tags.map(tagObj => tagObj.tag.name);
  
  // Create excerpt from content (removing HTML tags and limiting length)
  const excerpt = apiArticle.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 150) + (apiArticle.content.length > 150 ? '...' : '');
  
  return {
    id: apiArticle.id.toString(),
    title: apiArticle.title,
    excerpt: excerpt,
    content: apiArticle.content,
    imageUrl: '', // API doesn't provide image URL, using empty string
    author: apiArticle.author,
    publishedDate: apiArticle.created_at,
    readTime: apiArticle.minuteRead,
    categoryId: apiArticle.blogsCategoryId.toString(),
    subcategoryId: apiArticle.blogsSubCategoryId.toString(),
    type: 'prelims', // Default to prelims, you can modify this logic as needed
    tags: tags,
    isPopular: apiArticle.setPopular === 1
  };
}

// Fetch blog categories
export async function fetchBlogCategories(): Promise<ApiCategoryResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.BLOGS_CATEGORIES, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImNvbnRhY3ROdW1iZXIiOiI4Nzg4NTA2NjUwIiwiaWF0IjoxNzQ3NjUzNDUzLCJleHAiOjE3NDc2OTY2NTN9.8nfbkPJ8EHe5nL3-F4-JUZ5L2xGhSSNLtix63s75Ozo'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiCategoryResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    // Return fallback data in case of error
    return {
      blogsCategories: [
        {
          id: 1,
          name: "General Studies",
          slug: "general-studies",
          is_active: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          name: "Current Affairs",
          slug: "current-affairs",
          is_active: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      status: 200
    };
  }
}

// Fetch blog subcategories for a specific category
export async function fetchBlogSubcategories(categoryId: number): Promise<ApiSubcategoryResponse> {
  try {
    const response = await fetch(`${API_ENDPOINTS.BLOGS_SUBCATEGORIES}?categoryId=${categoryId}`, {
      method: 'GET',
      headers: {}
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiSubcategoryResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog subcategories:', error);
    // Return fallback data in case of error
    return {
      blogsSubCategories: [],
      status: 200
    };
  }
}

// Fetch blog articles with optional filters
export async function fetchBlogArticles(categoryId?: number, subCategoryId?: number): Promise<ApiBlogArticlesResponse> {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (categoryId) {
      params.append('categoryId', categoryId.toString());
    }
    if (subCategoryId) {
      params.append('subCategoryId', subCategoryId.toString());
    }
    
    const url = `${API_ENDPOINTS.BLOGS_ARTICLES}${params.toString() ? '?' + params.toString() : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {}
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiBlogArticlesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    // Return fallback data in case of error
    return {
      responseResult: [],
      totalCount: 0,
      totalPages: 0,
      perPage: 10,
      status: 200
    };
  }
}

// Fetch a single blog article by ID
export async function fetchSingleBlogArticle(articleId: number): Promise<SingleArticleResponse> {
  try {
    const response = await fetch(`${API_ENDPOINTS.SINGLE_BLOG_ARTICLE}/${articleId}`, {
      method: 'GET',
      headers: {}
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: SingleArticleResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching single blog article:', error);
    // Return fallback data in case of error
    throw error;
  }
}