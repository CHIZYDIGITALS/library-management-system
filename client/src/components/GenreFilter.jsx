function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <select
      value={selectedGenre}
      onChange={(e) => onGenreChange(e.target.value)}
    >
      <option value="">All Genres</option>

      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}

export default GenreFilter;
