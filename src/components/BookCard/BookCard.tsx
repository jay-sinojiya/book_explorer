import React from "react";
import { Link } from "react-router-dom";

import type { Book } from "../../types/book";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import { useStoreDispatch, useStoreSelector } from "../../hooks/reduxHooks";

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

  const truncatedDescription = book.description && book.description.length > 100 
    ? book.description.substring(0, 100) + "..."
    : book.description;

  return (
    <div className="book-card" aria-label={`Book: ${book.title}`}>
      <img
        src={book.thumbnail || "https://via.placeholder.com/120x180?text=No+Cover"}
        alt={`Cover of ${book.title}`}
        width={120}
      />

      <h3>{book.title}</h3>

      <p aria-label="Authors">{book.authors?.join(", ") || "Unknown Author"}</p>
      
      {truncatedDescription && (
        <p className="book-description" aria-label="Description">
          {truncatedDescription}
        </p>
      )}

      <button 
        onClick={handleFavorite}
        aria-label={isFavorite ? `Remove ${book.title} from favorites` : `Add ${book.title} to favorites`}
      >
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>

      <br />
      <br />

      <Link to={`/book/${book.id}`} aria-label={`View details for ${book.title}`}>
        View Details
      </Link>
    </div>
  );
});

export default BookCard;
