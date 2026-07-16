import type { Book } from '../types/book';

export interface GoogleBookItem {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    language?: string;
    infoLink?: string;
  };
}

export const getBookDetails = (item: GoogleBookItem): Book => {
  const volumeInfo = item.volumeInfo || {};
  return {
    id: item.id,
    title: volumeInfo.title || 'Unknown Title',
    authors: volumeInfo.authors,
    description: volumeInfo.description,
    thumbnail: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:'),
    publishedDate: volumeInfo.publishedDate,
    publisher: volumeInfo.publisher,
    pageCount: volumeInfo.pageCount,
    categories: volumeInfo.categories,
    averageRating: volumeInfo.averageRating,
    ratingsCount: volumeInfo.ratingsCount,
    language: volumeInfo.language,
    infoLink: volumeInfo.infoLink,
  };
};
