// API utility functions for the Sunya IAS application
import { API_ENDPOINTS } from './constants';
import { BlogBannerResponse, MenuButtonsResponse } from '../types/blog';

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