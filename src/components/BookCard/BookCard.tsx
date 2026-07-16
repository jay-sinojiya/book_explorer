import { Link } from "react-router-dom";

import type { Book } from "../../types/book";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import { useStoreDispatch, useStoreSelector } from "../../hooks/reduxHooks";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
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

  return (
    <div>
      <img
        src={book.thumbnail}
        alt={book.title}
        width={120}
      />

      <h3>{book.title}</h3>

      <p>{book.authors?.join(", ")}</p>

      <button onClick={handleFavorite}>
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>

      <br />
      <br />

      <Link to={`/book/${book.id}`}>
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
