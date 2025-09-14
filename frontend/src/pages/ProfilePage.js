import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { WatchlistContext } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';

const ProfilePage = () => {
  const { watchlist, fetchWatchlist } = useContext(WatchlistContext);
  const location = useLocation(); // Get the location object

  useEffect(() => {
    fetchWatchlist();
  }, [location, fetchWatchlist]); // Re-run the effect every time the location changes

  return (
    <div>
      <h2>My Watchlist</h2>
      {watchlist.length > 0 ? (
        watchlist.map(movie => <MovieCard key={movie._id} movie={movie} />)
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default ProfilePage;