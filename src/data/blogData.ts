import { Category, Blog } from '../types/blog';

export const categories: Category[] = [
  {
    id: 'history',
    name: 'History',
    subcategories: [
      { id: 'ancient', name: 'Ancient History', categoryId: 'history' },
      { id: 'medieval', name: 'Medieval History', categoryId: 'history' },
      { id: 'modern', name: 'Modern History', categoryId: 'history' },
      { id: 'world-history', name: 'World History', categoryId: 'history' }
    ]
  },
  {
    id: 'geography',
    name: 'Geography',
    subcategories: [
      { id: 'physical', name: 'Physical Geography', categoryId: 'geography' },
      { id: 'human', name: 'Human Geography', categoryId: 'geography' },
      { id: 'economic', name: 'Economic Geography', categoryId: 'geography' },
      { id: 'world-geo', name: 'World Geography', categoryId: 'geography' }
    ]
  },
  {
    id: 'polity',
    name: 'Polity',
    subcategories: [
      { id: 'constitution', name: 'Constitution', categoryId: 'polity' },
      { id: 'governance', name: 'Governance', categoryId: 'polity' },
      { id: 'judiciary', name: 'Judiciary', categoryId: 'polity' },
      { id: 'federalism', name: 'Federalism', categoryId: 'polity' }
    ]
  },
  {
    id: 'economy',
    name: 'Economy',
    subcategories: [
      { id: 'macro-economics', name: 'Macro Economics', categoryId: 'economy' },
      { id: 'micro-economics', name: 'Micro Economics', categoryId: 'economy' },
      { id: 'public-finance', name: 'Public Finance', categoryId: 'economy' },
      { id: 'economic-survey', name: 'Economic Survey', categoryId: 'economy' }
    ]
  },
  {
    id: 'environment',
    name: 'Environment',
    subcategories: [
      { id: 'ecology', name: 'Ecology', categoryId: 'environment' },
      { id: 'climate-change', name: 'Climate Change', categoryId: 'environment' },
      { id: 'biodiversity', name: 'Biodiversity', categoryId: 'environment' },
      { id: 'conservation', name: 'Conservation', categoryId: 'environment' }
    ]
  },
  {
    id: 'science-tech',
    name: 'Science & Technology',
    subcategories: [
      { id: 'space', name: 'Space Technology', categoryId: 'science-tech' },
      { id: 'biotech', name: 'Biotechnology', categoryId: 'science-tech' },
      { id: 'it', name: 'Information Technology', categoryId: 'science-tech' },
      { id: 'defence', name: 'Defence Technology', categoryId: 'science-tech' }
    ]
  },
  {
    id: 'current-affairs',
    name: 'Current Affairs',
    subcategories: [
      { id: 'national', name: 'National Affairs', categoryId: 'current-affairs' },
      { id: 'international', name: 'International Affairs', categoryId: 'current-affairs' },
      { id: 'schemes', name: 'Government Schemes', categoryId: 'current-affairs' },
      { id: 'awards', name: 'Awards & Recognition', categoryId: 'current-affairs' }
    ]
  }
];

export const dummyBlogs: Blog[] = [
  // Prelims Blogs
  {
    id: '1',
    title: 'Ancient Indian Civilizations: Harappan Culture',
    excerpt: 'Explore the fascinating world of Harappan civilization, its urban planning, trade networks, and mysterious decline.',
    content: 'The Harappan civilization, also known as the Indus Valley Civilization, was one of the world\'s earliest urban civilizations...',
    imageUrl: '/buildings.jpg',
    author: 'Dr. Priya Sharma',
    publishedDate: '2024-01-15',
    readTime: 8,
    categoryId: 'history',
    subcategoryId: 'ancient',
    type: 'prelims',
    tags: ['Harappan', 'Indus Valley', 'Ancient India'],
    isPopular: true
  },
  {
    id: '2',
    title: 'Constitutional Framework of India',
    excerpt: 'Understanding the basic structure doctrine and its significance in Indian constitutional law.',
    content: 'The basic structure doctrine is a judicial principle that certain features of the Indian Constitution...',
    imageUrl: '/buildings.jpg',
    author: 'Prof. Rajesh Kumar',
    publishedDate: '2024-01-20',
    readTime: 12,
    categoryId: 'polity',
    subcategoryId: 'constitution',
    type: 'prelims',
    tags: ['Constitution', 'Basic Structure', 'Supreme Court']
  },
  {
    id: '3',
    title: 'Climate Change and Global Warming',
    excerpt: 'Comprehensive analysis of climate change impacts and global mitigation strategies.',
    content: 'Climate change represents one of the most pressing challenges of our time...',
    imageUrl: '/buildings.jpg',
    author: 'Dr. Anita Verma',
    publishedDate: '2024-01-25',
    readTime: 10,
    categoryId: 'environment',
    subcategoryId: 'climate-change',
    type: 'prelims',
    tags: ['Climate Change', 'Global Warming', 'Paris Agreement']
  },
  {
    id: '4',
    title: 'Indian Economic Reforms: 1991 Liberalization',
    excerpt: 'Impact of 1991 economic reforms on India\'s economic growth and development trajectory.',
    content: 'The economic reforms of 1991 marked a turning point in India\'s economic history...',
    imageUrl: '/buildings.jpg',
    author: 'Dr. Suresh Mehta',
    publishedDate: '2024-02-01',
    readTime: 15,
    categoryId: 'economy',
    subcategoryId: 'macro-economics',
    type: 'prelims',
    tags: ['Economic Reforms', 'Liberalization', 'LPG Policy'],
    isPopular: true
  },
  {
    id: '5',
    title: 'Space Technology: ISRO Achievements',
    excerpt: 'India\'s remarkable journey in space exploration and technological advancements.',
    content: 'The Indian Space Research Organisation (ISRO) has achieved remarkable milestones...',
    imageUrl: '/buildings.jpg',
    author: 'Dr. Kavita Singh',
    publishedDate: '2024-02-05',
    readTime: 9,
    categoryId: 'science-tech',
    subcategoryId: 'space',
    type: 'prelims',
    tags: ['ISRO', 'Chandrayaan', 'Mars Mission']
  },

  // Mains Blogs
  {
    id: '6',
    title: 'Medieval India: Mughal Administration',
    excerpt: 'Detailed analysis of Mughal administrative system and its impact on modern governance.',
    content: 'The Mughal Empire\'s administrative system was one of the most sophisticated...',
    imageUrl: '/buildings.jpg',
    author: 'Prof. Mohammad Ali',
    publishedDate: '2024-01-18',
    readTime: 20,
    categoryId: 'history',
    subcategoryId: 'medieval',
    type: 'mains',
    tags: ['Mughal Empire', 'Administration', 'Akbar']
  },
  {
    id: '7',
    title: 'Federal Structure and Centre-State Relations',
    excerpt: 'Critical examination of India\'s federal structure and evolving centre-state dynamics.',
    content: 'India\'s federal structure has evolved significantly since independence...',
    imageUrl: '/buildings.jpg',
    author: 'Dr. Neha Gupta',
    publishedDate: '2024-01-22',
    readTime: 18,
    categoryId: 'polity',
    subcategoryId: 'federalism',
    type: 'mains',
    tags: ['Federalism', 'Centre-State Relations', 'Cooperative Federalism'],
    isPopular: true
  },
  {
    id: '8',
    title: 'Physical Geography: Plate Tectonics',
    excerpt: 'Understanding plate tectonic theory and its implications for geological phenomena.',
    content: 'Plate tectonics theory revolutionized our understanding of Earth\'s structure...',
    imageUrl: '/buildings.jpg',
    author: 'Dr. Ravi Prasad',
    publishedDate: '2024-01-28',
    readTime: 16,
    categoryId: 'geography',
    subcategoryId: 'physical',
    type: 'mains',
    tags: ['Plate Tectonics', 'Earthquakes', 'Volcanism']
  },
  {
    id: '9',
    title: 'Public Finance and Fiscal Policy',
    excerpt: 'Comprehensive analysis of India\'s fiscal policy framework and public finance management.',
    content: 'Public finance plays a crucial role in economic development and governance...',
    imageUrl: '/buildings.jpg',
    author: 'Prof. Deepak Agarwal',
    publishedDate: '2024-02-03',
    readTime: 22,
    categoryId: 'economy',
    subcategoryId: 'public-finance',
    type: 'mains',
    tags: ['Fiscal Policy', 'Budget', 'Public Debt']
  },
  {
    id: '10',
    title: 'Biodiversity Conservation Strategies',
    excerpt: 'Examining global and national approaches to biodiversity conservation and sustainable development.',
    content: 'Biodiversity conservation has become a critical priority for sustainable development...',
    imageUrl: '/buildings.jpg',
    author: 'Dr. Sunita Patel',
    publishedDate: '2024-02-08',
    readTime: 19,
    categoryId: 'environment',
    subcategoryId: 'biodiversity',
    type: 'mains',
    tags: ['Biodiversity', 'Conservation', 'Sustainable Development'],
    isPopular: true
  },

  // Additional blogs to fill both panels
  {
    id: '11',
    title: 'Modern Indian History: Independence Movement',
    excerpt: 'Key phases and leaders of India\'s struggle for independence from British rule.',
    content: 'The Indian independence movement was a series of historic events...',
    imageUrl: '/buildings.jpg',
    author: 'Dr. Meera Joshi',
    publishedDate: '2024-02-10',
    readTime: 14,
    categoryId: 'history',
    subcategoryId: 'modern',
    type: 'prelims',
    tags: ['Independence Movement', 'Gandhi', 'Quit India']
  },
  {
    id: '12',
    title: 'Governance and Public Administration',
    excerpt: 'Challenges and reforms in Indian public administration system.',
    content: 'Good governance is essential for effective public service delivery...',
    imageUrl: '/buildings.jpg',
    author: 'Prof. Amit Jain',
    publishedDate: '2024-02-12',
    readTime: 17,
    categoryId: 'polity',
    subcategoryId: 'governance',
    type: 'mains',
    tags: ['Governance', 'Public Administration', 'Reforms']
  }
];