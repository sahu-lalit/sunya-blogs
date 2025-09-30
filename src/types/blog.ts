export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  readTime: number; // in minutes
  categoryId: string;
  subcategoryId: string;
  type: 'prelims' | 'mains';
  tags: string[];
  isPopular?: boolean;
}

export interface FilterState {
  category: string;
  subcategory: string;
}