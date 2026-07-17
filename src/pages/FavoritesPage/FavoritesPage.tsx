import BookCard from "../../components/BookCard/BookCard";
import { useStoreSelector } from "../../hooks/reduxHooks";
import "../SearchPage/SearchPage.css";
import "../../components/BookList/BookList.css";

const FavoritesPage = () => {
  const favoriteBooks = useStoreSelector(
    (state) => state.favorites.books
  );

  return (
    <div className="search-page">
      <h1 className="page-title">Favorite Books</h1>

      {favoriteBooks.length === 0 ? (
        <p className="no-books">No favorite books found.</p>
      ) : (
        <div className="book-list">
          {favoriteBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;