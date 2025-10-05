// API endpoints and constants for the Sunya IAS application

export const API_BASE_URL = 'https://admin.sunyaiashindi.com/api/v1';

export const API_ENDPOINTS = {
  BLOGS_BANNER: `${API_BASE_URL}/blogs/banner`,
  MENU_BUTTONS: `${API_BASE_URL}/blogs/menu-buttons`,
  BLOGS_CATEGORIES: `${API_BASE_URL}/blogs/category`,
  BLOGS_SUBCATEGORIES: `${API_BASE_URL}/blogs/sub-category`,
  BLOGS_ARTICLES: `${API_BASE_URL}/blogs/article`,
  SINGLE_BLOG_ARTICLE: `${API_BASE_URL}/blogs/article`,
  COACHING_CENTERS: `${API_BASE_URL}/blogs/coaching-center`,
  // Add other endpoints here as needed
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;