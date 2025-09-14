import React, { createContext, useState, useContext, useCallback } from 'react'; // Import useCallback
import { getWatchlist } from '../api';
import { AuthContext } from './AuthContext';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const { token } = useContext(AuthContext);

  // Wrap the function in useCallback
  const fetchWatchlist = useCallback(async () => {
    if (token) {
      try {
        const { data } = await getWatchlist(token);
        setWatchlist(data);
      } catch (error) {
        console.error('Failed to fetch watchlist', error);
      }
    }
  }, [token]); // Dependency is token

  return (
    <WatchlistContext.Provider value={{ watchlist, fetchWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};