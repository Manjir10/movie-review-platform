import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const MovieCard = ({ movie }) => {
  return (
    // Wrap the div in a Link component
    <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px' }}>
        <h3>{movie.title} ({movie.releaseYear})</h3>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p>{movie.synopsis}</p>
      </div>
    </Link>
  );
};

export default MovieCard;