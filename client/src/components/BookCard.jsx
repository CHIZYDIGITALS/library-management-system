import { Link } from "react-router-dom";
import { useContext } from "react";
import { ReadingListContext } from "../context/ReadingListContext.jsx";

function BookCard({ book }) {
  const { dispatch } = useContext(ReadingListContext);

  function handleAddToReadingList() {
    dispatch({
      type: "ADD_BOOK",
      payload: book,
    });
  }

  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`}>
        <h3>{book.title}</h3>
      </Link>

      <p>Author: {book.author}</p>
      <p>Published: {book.publishedYr}</p>

      <button onClick={handleAddToReadingList}>Add to Reading List</button>
    </div>
  );
}

export default BookCard;
