import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// --- USER ROUTES ---
export const loginUser = (userData) => API.post('/users/login', userData);
export const registerUser = (userData) => API.post('/users/register', userData);

// --- MOVIE ROUTES ---
export const fetchMovies = (searchTerm = '') => API.get(`/movies?search=${searchTerm}`);
export const fetchMovieById = (id) => API.get(`/movies/${id}`);
export const addMovie = (movieData, token) => API.post('/movies', movieData, {
    headers: { 'x-auth-token': token }
});

// --- REVIEW ROUTES ---
export const addReview = (id, reviewData, token) => API.post(`/movies/${id}/reviews`, reviewData, {
    headers: { 'x-auth-token': token }
});

// --- WATCHLIST ROUTES ---
export const addToWatchlist = (movieId, token) => API.post(`/users/watchlist/${movieId}`, {}, { headers: { 'x-auth-token': token } });
export const getWatchlist = (token) => API.get('/users/watchlist', { headers: { 'x-auth-token': token } });

export default API;