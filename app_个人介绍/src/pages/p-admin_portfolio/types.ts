

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  uploadTime: string;
  viewCount: number;
  fileName: string;
  fileUrl: string;
}

export interface FormData {
  title: string;
  category: string;
  description: string;
  file: File | null;
}

