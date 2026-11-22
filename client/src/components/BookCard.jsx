import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`}>
        <h3>{book.title}</h3>
      </Link>

      <p>Author: {book.author}</p>
      <p>Published: {book.publishedYr}</p>
    </div>
  );
}

export default BookCard;
