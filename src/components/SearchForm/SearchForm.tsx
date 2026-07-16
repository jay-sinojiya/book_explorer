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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const { items } = await searchBooks(searchQuery);
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
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search by title, author, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
