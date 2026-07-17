import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

import { useStoreSelector } from "../../hooks/reduxHooks";
import "./BookList.css";

const BookList = () => {
  const { books, loading, error } = useStoreSelector(
    (state) => state.books
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="no-books">{error}</p>;
  }

  if (books.length === 0) {
    return <p className="no-books">No books found.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
