import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext'; // Import WatchlistProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <WatchlistProvider> {/* Wrap the App with the WatchlistProvider */}
        <App />
      </WatchlistProvider>
    </AuthProvider>
  </React.StrictMode>
);