import { Link } from "react-router-dom";
import type { Book } from "../../types/book";
import './BookCard.css';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="book-card">
      {book.thumbnail ? (
        <img
          src={book.thumbnail}
          alt={book.title}
          className="book-card-image"
        />
      ) : (
        <div className="book-card-placeholder">No Cover</div>
      )}

      <h3 className="book-card-title">{book.title}</h3>

      <p className="book-card-authors">{book.authors?.join(", ")}</p>

      <Link to={`/book/${book.id}`} className="book-card-link">
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
