import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MovieDetailPage from './pages/MovieDetailPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AddMoviePage from './pages/AddMoviePage'; // 1. Import the new page
import { AuthContext } from './context/AuthContext';

function App() {
  const { token, logout } = useContext(AuthContext);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MovieReviews</Link>
          <div className="d-flex align-items-center">
            <Link className="nav-link text-white me-3" to="/">Home</Link>
            {!token ? (
              <>
                <Link className="nav-link text-white me-3" to="/register">Register</Link>
                <Link className="nav-link text-white" to="/login">Login</Link>
              </>
            ) : (
              <>
                {/* 2. Add the "Add Movie" link */}
                <Link className="nav-link text-white me-3" to="/add-movie">Add Movie</Link>
                <Link className="nav-link text-white me-3" to="/profile">Profile</Link>
                <button onClick={logout} className="btn btn-outline-light">Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-movie" element={<AddMoviePage />} /> {/* 3. Add the route */}
          <Route path="/movies/:id" element={<MovieDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;