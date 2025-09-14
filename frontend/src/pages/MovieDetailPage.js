import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById, addReview, addToWatchlist } from '../api';
import { AuthContext } from '../context/AuthContext';
import { WatchlistContext } from '../context/WatchlistContext'; // Import WatchlistContext

const MovieDetailPage = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { fetchWatchlist } = useContext(WatchlistContext); // Get the fetch function from context
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const getMovie = async () => {
      try {
        const { data } = await fetchMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    getMovie();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addReview(id, { rating, reviewText }, token);
      setMovie(prevMovie => ({ ...prevMovie, reviews: data }));
      setReviewText('');
      setRating(5);
    } catch (error) {
      console.error('Failed to submit review', error);
      alert('Failed to submit review. You must be logged in.');
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(id, token);
      fetchWatchlist(); // Re-fetch the global watchlist after adding a movie
      alert('Added to your watchlist!');
    } catch (error) {
      console.error('Failed to add to watchlist', error);
      alert('Failed to add to watchlist. Maybe it is already there?');
    }
  };

  if (!movie) return <div className="text-center">Loading...</div>;

  return (
    // ... JSX for this component remains the same ...
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{movie.title}</h2>
          <h6 className="card-subtitle mb-2 text-muted">{movie.genre} - {movie.releaseYear}</h6>
          <p className="card-text">{movie.synopsis}</p>
          {token && (
            <button onClick={handleAddToWatchlist} className="btn btn-secondary mt-3">
              Add to Watchlist
            </button>
          )}
        </div>
      </div>

      <hr />

      {token && (
        <div className="card my-4">
          <div className="card-body">
            <h5 className="card-title">Write a Review</h5>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-3">
                <label htmlFor="ratingSelect" className="form-label">Rating</label>
                <select id="ratingSelect" className="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1 - Awful</option>
                  <option value="2">2 - Poor</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="reviewText" className="form-label">Your Review</label>
                <textarea
                  id="reviewText"
                  className="form-control"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  rows="3"
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
          </div>
        </div>
      )}

      <h3>Reviews</h3>
      {movie.reviews && movie.reviews.length > 0 ? (
        movie.reviews.map((review) => (
          <div key={review._id} className="card mb-3">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Rating: {review.rating} / 5</h6>
              <p className="card-text">{review.reviewText}</p>
              <footer className="blockquote-footer mt-2">
                Reviewed on {new Date(review.timestamp).toLocaleDateString()}
              </footer>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default MovieDetailPage;