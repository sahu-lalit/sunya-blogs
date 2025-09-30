// API utility functions for the Sunya IAS application

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