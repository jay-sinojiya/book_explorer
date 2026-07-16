import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

import { useStoreSelector } from "../../hooks/reduxHooks";

const BookList = () => {
  const { books, loading, error } = useStoreSelector(
    (state) => state.books
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
