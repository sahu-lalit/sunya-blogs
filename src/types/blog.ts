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

export interface BlogBanner {
  id: number;
  title: string;
  content: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface BlogBannerResponse {
  blogsBanners: BlogBanner[];
  status: number;
}

export interface MenuButton {
  id: number;
  name: string;
  redirect_url: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface MenuButtonsResponse {
  blogsMenuButtons: MenuButton[];
  status: number;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ApiCategoryResponse {
  blogsCategories: ApiCategory[];
  status: number;
}

export interface ApiSubcategory {
  id: number;
  name: string;
  slug: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ApiSubcategoryResponse {
  blogsSubCategories: ApiSubcategory[];
  status: number;
}

export interface ApiTag {
  tag: {
    id: number;
    name: string;
  };
}

export interface ApiBlogCategory {
  id: number;
  name: string;
}

export interface ApiBlogSubCategory {
  id: number;
  name: string;
}

export interface ApiBlogArticle {
  id: number;
  slug: string;
  title: string;
  content: string;
  author: string;
  blogsCategoryId: number;
  blogsCategory: ApiBlogCategory;
  blogsSubCategoryId: number;
  blogsSubCategory: ApiBlogSubCategory;
  tags: ApiTag[];
  minuteRead: number;
  setPopular: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ApiBlogArticlesResponse {
  responseResult: ApiBlogArticle[];
  totalCount: number;
  totalPages: number;
  perPage: number;
  status: number;
}

export interface ArticleImage {
  id: number;
  url: string;
  articleId: number;
  created_at: string;
  updated_at: string;
}

export interface SingleBlogArticle {
  id: number;
  title: string;
  content: string;
  blogsCategoryId: number;
  blogsCategory: ApiBlogCategory;
  blogsSubCategoryId: number;
  blogsSubCategory: ApiBlogSubCategory;
  author: string;
  minuteRead: number;
  tags: ApiTag[];
  images: ArticleImage[];
  youtubeVideoLink: string;
  setPopular: number;
  is_active: number;
}

export interface SingleArticleResponse {
  message: string;
  blogsArticle: SingleBlogArticle;
  status: number;
}

// Coaching Center Types
export interface CoachingCenter {
  id: number;
  city: string;
  address: string;
  mapLink: string;
  mobileNo: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface CoachingCentersResponse {
  coachingCenters: CoachingCenter[];
  status: number;
}