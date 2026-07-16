import { FormEvent, useState } from "react";
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [searchBook, setSearchBook] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(searchBook);
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={searchBook}
            placeholder="Search by title, author, or keyword..."
            onChange={(e) => setSearchBook(e.target.value)}
          />
        </div>

        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
