import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../api';
import { AuthContext } from '../context/AuthContext';

const AddMoviePage = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addMovie({ title, genre, releaseYear, synopsis }, token);
      alert('Movie added successfully!');
      navigate(`/movies/${data._id}`); // Redirect to the new movie's detail page
    } catch (error) {
      console.error('Failed to add movie', error);
      alert('Failed to add movie. Please check the details and try again.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2 className="mb-4">Add a New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Genre</label>
            <input type="text" className="form-control" value={genre} onChange={(e) => setGenre(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Release Year</label>
            <input type="number" className="form-control" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Synopsis</label>
            <textarea className="form-control" rows="4" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit Movie</button>
        </form>
      </div>
    </div>
  );
};

export default AddMoviePage;