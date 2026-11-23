import { useContext } from "react";
import { ReadingListContext } from "../context/ReadingListContext.jsx";

function ReadingListPage() {
  const { readingList, dispatch } = useContext(ReadingListContext);

  function handleRemoveBook(bookId) {
    dispatch({
      type: "REMOVE_BOOK",
      payload: bookId,
    });
  }

  function handleClearList() {
    dispatch({
      type: "CLEAR_LIST",
    });
  }

  return (
    <div>
      <h1>My Reading List</h1>

      {readingList.length === 0 ? (
        <p>Your reading list is empty.</p>
      ) : (
        <>
          <button onClick={handleClearList}>Clear Reading List</button>

          {readingList.map((book) => (
            <div key={book.id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>

              <button onClick={() => handleRemoveBook(book.id)}>
                Remove Book
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ReadingListPage;
