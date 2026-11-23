import { useContext } from "react";
import { Link } from "react-router-dom";
import { ReadingListContext } from "../context/ReadingListContext.jsx";

function Navbar() {
  const { readingList } = useContext(ReadingListContext);

  return (
    <nav>
      <Link to="/">Library Management System</Link>

      <Link to="/reading-list">Reading List ({readingList.length})</Link>
    </nav>
  );
}

export default Navbar;
