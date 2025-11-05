

export interface PortfolioItem {
  title: string;
  category: string;
  date: string;
  views: string;
  description: string;
  mediaType: 'image' | 'video' | 'document';
  mainMedia: string;
  mediaAlt: string;
  additionalMedia?: string[];
}

export interface PortfolioData {
  [key: string]: PortfolioItem;
}

