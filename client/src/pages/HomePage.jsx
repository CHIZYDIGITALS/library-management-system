import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import BookGrid from "../components/BookGrid.jsx";
import SearchBar from "../components/SearchBar.jsx";
import GenreFilter from "../components/GenreFilter.jsx";

function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/genres`,
        );

        setGenres(response.data);
      } catch (error) {
        console.error("Unable to load genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  return (
    <div className="home-page">
      <h1>Library Management System</h1>
      <p>Explore our collection of books.</p>

      <div className="search-controls">
        <SearchBar onSearch={handleSearch} />

        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </div>

      <BookGrid search={search} genreId={selectedGenre} />
    </div>
  );
}

export default HomePage;
