import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { searchBooks } from '../../api/googleBooksApi';
import type { Book } from '../../types/book';
import SearchForm from '../../components/SearchForm/SearchForm';
import BookList from '../../components/BookList/BookList';
import Loader from '../../components/Loader/Loader';
import './SearchPage.css';

const SearchPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await searchBooks('bestsellers');
        setBooks(result.items);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Failed to fetch initial books';
        setError(errMsg);
        toast.error(errMsg, { id: 'initial-fetch-error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  const handleSearch = async (query: string) => {
    const searchBook = query.trim();
    if (!searchBook) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await searchBooks(searchBook);
      setBooks(result.items);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to search books';
      setError(errMsg);
      toast.error(errMsg, { id: 'search-books-error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1 className="page-title">Discover Books</h1>
      <SearchForm onSearch={handleSearch} />

      {isLoading && <Loader />}
      {!isLoading && !error && <BookList books={books} />}
    </div>
  );
};

export default SearchPage;