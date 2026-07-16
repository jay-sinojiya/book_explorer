import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../../api/googleBooksApi';
import type { Book } from '../../types/book';

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedBook = await getBookById(id);
        setBook(fetchedBook);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch book details');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (isLoading) return <div>Loading book details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!book) return <div>No book details found.</div>;

  return (
    <div>
      <Link to="/">&larr; Back to Search</Link>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        {book.thumbnail && (
          <img 
            src={book.thumbnail} 
            alt={book.title} 
            style={{ width: '200px', height: 'fit-content' }} 
          />
        )}
        <div>
          <h1>{book.title}</h1>
          {book.authors && <h3>By {book.authors.join(', ')}</h3>}
          {book.publisher && <p><strong>Publisher:</strong> {book.publisher}</p>}
          {book.publishedDate && <p><strong>Published Date:</strong> {book.publishedDate}</p>}
          {book.pageCount && <p><strong>Pages:</strong> {book.pageCount}</p>}
          {book.categories && <p><strong>Categories:</strong> {book.categories.join(', ')}</p>}
          
          {book.description && (
            <div style={{ marginTop: '1rem' }}>
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
          )}
          
          {book.infoLink && (
            <a 
              href={book.infoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: '1rem' }}
            >
              View on Google Books
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;