export interface Book {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  thumbnail?: string;
  publishedDate?: string;
  publisher?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  language?: string;
  infoLink?: string;
}
