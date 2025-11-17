export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string; // ISO string
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  imageUrl: string;
  featured: boolean;
  views: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  date: string; // ISO string
  content: string;
  approved: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  READER = 'READER',
}

export interface Category {
  name: string;
  slug: string;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface GenerateContentConfig {
  systemInstruction?: string;
  topK?: number;
  topP?: number;
  temperature?: number;
  responseMimeType?: string;
  seed?: number;
  maxOutputTokens?: number;
  thinkingConfig?: { thinkingBudget: number };
}
