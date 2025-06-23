export interface Advertisement {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: string;
  date: string;
  time?: string;
  maxParticipants: number;
  currentParticipants: number;
  authorName: string;
  authorContact: string;
  authorAvatar?: string;
  createdAt: Date;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface User {
  name: string;
  email: string;
  password?: string;
  avatar: string;
  bio?: string;
  instagram?: string;
  twitter?: string;
}

export interface CreateAdForm {
  title: string;
  description: string;
  categoryId: string;
  location: string;
  date: string;
  time: string;
  maxParticipants: number;
  authorName?: string;
  authorContact?: string;
  tags: string[];
}