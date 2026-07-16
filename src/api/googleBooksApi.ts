import type { Book } from '../types/book';
import { getBookDetails } from '../utils/getBookDetails';

const API_BASE_URL = 'https://www.googleapis.com/books/v1';

export interface SearchParams {
  title?: string;
  author?: string;
  genre?: string;
  query?: string;
}

export const searchBooks = async (params: SearchParams | string, startIndex: number = 0, maxResults: number = 10): Promise<{ items: Book[]; totalItems: number }> => {
  let query = '';
  
  if (typeof params === 'string') {
    query = params;
  } else {
    const parts = [];
    if (params.title) parts.push(`intitle:${params.title}`);
    if (params.author) parts.push(`inauthor:${params.author}`);
    if (params.genre) parts.push(`subject:${params.genre}`);
    if (params.query) parts.push(params.query);
    query = parts.join('+');
  }
  if (!query) {
    return { items: [], totalItems: 0 };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `API error: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return {
      items: (data.items || []).map(getBookDetails),
      totalItems: data.totalItems || 0,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const response = await fetch(`${API_BASE_URL}/volumes/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `API error: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return getBookDetails(data);
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};
