import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { searchBooks } from '../../api/googleBooksApi';
import SearchForm from '../../components/SearchForm/SearchForm';
import BookList from '../../components/BookList/BookList';
import { useStoreDispatch } from '../../hooks/reduxHooks';
import { setBooks, setError, setLoading } from '../../features/books/booksSlice';
import './SearchPage.css';

const SearchPage = () => {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    const fetchInitialBooks = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const result = await searchBooks('bestsellers');
        dispatch(setBooks(result.items));
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Failed to fetch initial books';
        dispatch(setError(errMsg));
        toast.error(errMsg, { id: 'initial-fetch-error' });
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchInitialBooks();
  }, [dispatch]);

  return (
    <div className="search-page">
      <h1 className="page-title">Discover Books</h1>
      <SearchForm />
      <BookList />
    </div>
  );
};

export default SearchPage;
