import BookCard from "../../components/BookCard/BookCard";
import { useStoreSelector } from "../../hooks/reduxHooks";

const FavoritesPage = () => {
  const favoriteBooks = useStoreSelector(
    (state) => state.favorites.books
  );

  return (
    <div>
      <h1>Favorite Books</h1>

      {favoriteBooks.length === 0 ? (
        <p>No favorite books found.</p>
      ) : (
        favoriteBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))
      )}
    </div>
  );
};

export default FavoritesPage;