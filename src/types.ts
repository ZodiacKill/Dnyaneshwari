export interface Ovi {
  id: string; // e.g., "1.1", "2.11", "18.1793"
  chapterNumber: number; // 1 to 18
  oviNumber: number;
  originalMarathi: string;
  marathiBhavarth?: string;
  englishTranslation?: string;
  spiritualInsight?: string;
  tags?: string[];
  isFamous?: boolean;
  audioUrl?: string; // Optional audio recitation file URL
}

export interface Chapter {
  number: number;
  sanskritName: string;
  marathiTitle: string;
  englishTitle: string;
  totalOvis: number;
  summaryMarathi: string;
  summaryEnglish: string;
  themes: string[];
  keyOvis: Ovi[];
}

export interface UserBookmark {
  oviId: string;
  savedAt: string;
  note?: string;
}

export interface SearchFilter {
  query: string;
  chapterNumber: number | "all";
  tag: string | "all";
}

export interface AiExplanationState {
  loading: boolean;
  answer: string | null;
  error: string | null;
}
