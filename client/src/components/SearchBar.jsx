import { useEffect, useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input);
    }, 400);

    return () => clearTimeout(timer);
  }, [input, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search by book title or author..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}

export default SearchBar;
