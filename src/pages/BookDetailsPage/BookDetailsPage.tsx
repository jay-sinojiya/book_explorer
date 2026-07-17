import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../../api/googleBooksApi';
import type { Book } from '../../types/book';
import Loader from '../../components/Loader/Loader';
import './BookDetailsPage.css';

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

  if (isLoading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!book) return <div>No book details found.</div>;

  return (
    <div className="details-page">
      <Link to="/" className="back-link">&larr; Back to Search</Link>
      
      <div className="details-content">
        <div>
          {book.thumbnail && (
            <img 
              src={book.thumbnail.replace('&zoom=1', '&zoom=2')}
              alt={book.title} 
              className="details-image"
            />
          )}
        </div>
        
        <div className="details-info">
          <h1>{book.title}</h1>
          {book.authors && <h3 className="details-author">By {book.authors.join(', ')}</h3>}
          
          {(book.publisher || book.publishedDate || book.pageCount || book.categories) && (
            <div className="details-meta">
              {book.publisher && <div className="meta-item"><strong>Publisher</strong> {book.publisher}</div>}
              {book.publishedDate && <div className="meta-item"><strong>Published</strong> {book.publishedDate}</div>}
              {book.pageCount && <div className="meta-item"><strong>Pages</strong> {book.pageCount}</div>}
              {book.categories && <div className="meta-item"><strong>Category</strong> {book.categories[0]}</div>}
            </div>
          )}
          
          {book.description && (
            <div className="details-description">
              <h3>Synopsis</h3>
              <p>{book.description}</p>
            </div>
          )}
          
          {book.infoLink && (
            <a 
              href={book.infoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="details-link"
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