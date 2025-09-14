import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await fetchMovies(searchTerm);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    getMovies();
  }, [searchTerm]); // Re-run the effect whenever searchTerm changes

  return (
    <div>
      <h2 className="mb-4">Featured Movies</h2>

      {/* --- SEARCH BAR --- */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a movie by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* -------------------- */}

      <div>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;