export interface CompanyData {
  name: string;
  tradeName: string;
  tagline: string;
  foundedYear: number;
  yearsOfExperience: string;
  telephone: string;
  whatsapp: string;
  whatsappFormatted: string;
  whatsappLink: string;
  email: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode?: string;
    fullFormatted?: string;
    country: string;
    note: string;
  };
  openingHours: string;
  googleMapsProfileUrl: string;
  googleMapsDirectionsUrl?: string;
  googleMapsEmbedUrl: string;
  websiteUrl: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: 'esculturas' | 'cenografia' | 'sazonais' | 'tecnicas';
  categoryLabel: string;
  image: string;
  alt: string;
  summary: string;
  description: string;
  application: string;
  clientType?: string;
  dimensions?: string;
  material?: string;
  finish?: string;
  isHeroFeatured?: boolean;
  isPlaceholderPhoto: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  formattedDate: string;
  author: {
    name: string;
    role: string;
  };
  readingTime: string;
  image: string;
  alt: string;
  tags: string[];
  focusKeyword?: string;
  secondaryKeywords?: string[];
  metaDescription?: string;
  isPillarPost?: boolean;
  faq?: Array<{ question: string; answer: string }>;
  tableOfContents?: Array<{ id: string; label: string }>;
}

export interface GoogleReview {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  isProvisionalPlaceholder: boolean;
}

export interface SolutionData {
  slug: string;
  path: string;
  title: string;
  h1: string;
  subtitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  overview: string[];
  applications: {
    title: string;
    description: string;
  }[];
  clientProfiles: string[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedCategory: 'esculturas' | 'cenografia' | 'sazonais' | 'tecnicas';
}
