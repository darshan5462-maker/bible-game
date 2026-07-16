export type Tab = 'home' | 'quiz' | 'stories' | 'learning' | 'games';

export interface UserStats {
  coins: number;
  streak: number;
  xp: number;
  level: number;
  name: string;
}

export interface UserProfile {
  id: string;
  username: string;
  pin: string;
  name: string;
  persona: 'young' | 'elder' | 'explorer' | 'seeker';
  avatar: string;
  stats: UserStats;
  favorites: FavoriteVerse[];
}

export interface Question {
  id: number;
  question: string;
  questionKannada?: string;
  options: string[];
  correctIndex: number;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Book {
  id: string;
  name: string;
  nameKannada: string;
  category: string;
  description: string;
  progress: number;
  author: string;
  date: string;
  purpose: string;
  keyVerse: string;
  keyVerseRef: string;
  themes: string[];
}

export interface Character {
  id: string;
  name: string;
  nickname: string;
  role: string;
  tribe: string;
  bio: string;
  achievements: string[];
  keyVerses: string[];
  icon: string;
}

export interface FavoriteVerse {
  id: string;
  verse: string;
  reference: string;
  kannadaVerse?: string;
}
