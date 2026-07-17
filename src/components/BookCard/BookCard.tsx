import React from "react";
import { Link } from "react-router-dom";

import type { Book } from "../../types/book";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import { useStoreDispatch, useStoreSelector } from "../../hooks/reduxHooks";
import "./BookCard.css";

interface BookCardProps {
  book: Book;
}

const BookCard = React.memo(({ book }: BookCardProps) => {
  const dispatch = useStoreDispatch();

  const favoriteBooks = useStoreSelector(
    (state) => state.favorites.books
  );

  const isFavorite = favoriteBooks.some(
    (favorite) => favorite.id === book.id
  );

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(book.id));
    } else {
      dispatch(addFavorite(book));
    }
  };

  const truncatedDescription =
    book.description?.slice(0, 80) +
    (book.description && book.description.length > 80 ? "..." : "");

  return (
    <div className="book-card" aria-label={`Book: ${book.title}`}>
      <button 
        className={`favorite-icon-btn ${isFavorite ? 'is-favorite' : ''}`}
        onClick={handleFavorite}
        aria-label={isFavorite ? `Remove ${book.title} from favorites` : `Add ${book.title} to favorites`}
      >
        {isFavorite ? "♥" : "♡"}
      </button>

      <img
        src={book.thumbnail as string}
        alt={`Cover of ${book.title}`}
        className="book-card-image"
      />

      <h3 className="book-card-title">{book.title}</h3>

      <p className="book-card-authors" aria-label="Authors">
        {book.authors?.join(", ") || "Unknown Author"}
      </p>
      
      {truncatedDescription && (
        <p className="book-card-description" aria-label="Description">
          {truncatedDescription}
        </p>
      )}

      <div className="book-card-actions">
        <Link to={`/book/${book.id}`} className="book-card-link" aria-label={`View details for ${book.title}`}>
          View Details
        </Link>
      </div>
    </div>
  );
});

export default BookCard;
