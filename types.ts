export interface Book {
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  price?: string;
  tags?: string[];
}

export interface RecommendationRequest {
  query: string;
  mood?: string;
}

export interface CuratedList {
  title: string;
  description: string;
  books: Book[];
}

export type ViewState = 'HOME' | 'CURATOR' | 'EVENTS' | 'ABOUT';
