import React, { useState, useEffect } from 'react';
import { searchBooks } from '../../api/googleBooksApi';
import type { Book } from '../../types/book';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [searchBook, setSearchBook] = useState('');
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
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch initial books');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchBook.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await searchBooks(searchBook);
      setBooks(result.items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to search books');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Books</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchBook}
          onChange={(e) => setSearchBook(e.target.value)}
          placeholder="Search for books..."
        />
        <button type="submit" disabled={isLoading}>Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {books.map(book => (
          <li key={book.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            {book.thumbnail ? (
              <img src={book.thumbnail} alt={book.title} style={{ width: '100px', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100px', height: '150px', backgroundColor: '#eee' }} />
            )}
            <div>
              <h3><Link to={`/book/${book.id}`}>{book.title}</Link></h3>
              {book.authors && <p>By: {book.authors.join(', ')}</p>}
              {book.publishedDate && <p>Published: {book.publishedDate}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;