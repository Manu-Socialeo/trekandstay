import { phase1Blogs } from './phase1Blogs';
import { phase2Blogs } from './phase2Blogs';
import { phase3Blogs } from './phase3Blogs';

export interface BlogPostDetail {
  id: string;
  slug: string;
  destinationId: string;
  destinationName: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  wordCount: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: 'Sahyadri Trails' | 'Western Ghats' | 'Himalayan Yatra' | 'Adventure Sports' | 'Eco Living';
  tags: string[];
  metaDescription: string;
  image: string;
  gallery: string[];
  keyHighlights: string[];
  sustainabilityPillars: {
    title: string;
    description: string;
  }[];
  contentSections: {
    heading: string;
    paragraphs: string[];
    quote?: string;
  }[];
  seoKeywords: string[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const allBlogsData: BlogPostDetail[] = [
  ...phase1Blogs,
  ...phase2Blogs,
  ...phase3Blogs
];
