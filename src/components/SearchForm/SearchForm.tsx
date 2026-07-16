import { type FormEvent, useState } from "react";
import "./SearchForm.css";

import { searchBooks } from "../../api/googleBooksApi";
import {
  setBooks,
  setError,
  setLoading,
} from "../../features/books/booksSlice";
import { useStoreDispatch } from "../../hooks/reduxHooks";

const SearchForm = () => {
  const dispatch = useStoreDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() && !author.trim() && !genre.trim()) {
      dispatch(setError("Please fill in at least one search field."));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const { items } = await searchBooks({ title, author, genre });
      dispatch(setBooks(items));
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form" aria-label="Search for books">
        <div className="input-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Search by title"
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            aria-label="Search by author"
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            aria-label="Search by genre"
          />
        </div>

        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
