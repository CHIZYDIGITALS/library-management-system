import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${id}`,
        );

        setBook(response.data);
      } catch {
        setError("Unable to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="book-detail-page">
      <Link to="/" className="back-link">
        ← Back to Library
      </Link>

      <h1>{book.title}</h1>

      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Published:</strong> {book.publishedYr}
      </p>
      <p>
        <strong>Total Copies:</strong> {book.totalCopies}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre?.name}
      </p>
    </div>
  );
}

export default BookDetail;
