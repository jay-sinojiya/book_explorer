import type { Book } from "../../types/book";
import BookCard from "../BookCard/BookCard";
import './BookList.css';

interface BookListProps {
  books: Book[];
}

const BookList = ({ books }: BookListProps) => {
  if (books.length === 0) {
    return <p className="no-books">No books found. Try a different search!</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
        />
      ))}
    </div>
  );
};

export default BookList;
