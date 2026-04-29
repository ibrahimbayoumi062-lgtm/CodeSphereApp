export type Locale = 'en' | 'ar' | 'de';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  xp: number;
  level: number;
  streak: number;
  locale: Locale;
}

export interface Course {
  id: string;
  title: string;
  titleAr: string;
  titleDe: string;
  slug: string;
  description: string;
  descriptionAr: string;
  descriptionDe: string;
  category: string;
  difficulty: string;
  duration: number;
  lessonsCount: number;
  enrollmentsCount: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  titleAr: string;
  titleDe: string;
  description: string;
  descriptionAr: string;
  descriptionDe: string;
  duration: number;
  order: number;
  content: string;
  contentAr: string;
  contentDe: string;
  videoUrl: string | null;
  xpReward: number;
  quizzes: Quiz[];
  tasks: Task[];
}

export interface Quiz {
  id: string;
  question: string;
  questionAr: string;
  questionDe: string;
  options: string;
  answer: number;
  xpReward: number;
}

export interface Task {
  id: string;
  title: string;
  titleAr: string;
  titleDe: string;
  description: string;
  descriptionAr: string;
  descriptionDe: string;
  starterCode: string;
  solution: string;
  language: string;
  xpReward: number;
}

export interface Post {
  id: string;
  author: string;
  avatar: string | null;
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  time: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  level: number;
  badges: number;
  avatar: string | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Certificate {
  id: string;
  course: string;
  date: string;
  status: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  skills: string[];
  courses: string[];
  duration: string;
}

export interface Roadmap {
  title: string;
  color: string;
  icon: string;
  steps: RoadmapStep[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
