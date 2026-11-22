import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard.jsx";

function BookGrid({ search, genreId }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books`,
          {
            params: {
              search,
              genreId,
              limit: 100,
            },
          },
        );

        setBooks(response.data.data);
      } catch {
        setError("Unable to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, genreId]);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  const sortedBooks = [...books].sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy]),
  );

  return (
    <div>
      <div className="sort-controls">
        <label htmlFor="sort-books">Sort books by: </label>

        <select
          id="sort-books"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Title (A–Z)</option>
          <option value="author">Author (A–Z)</option>
        </select>
      </div>

      <div className="book-grid">
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BookGrid;
