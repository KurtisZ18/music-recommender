import React, { useState } from 'react';
import Header from './components/Header';
import SongInput from './components/SongInput';
import SongList from './components/SongList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSongs = (songName) => {
    setLoading(true);
    setError('');
    
    // Simulate fetching data from an API
    setTimeout(() => {
      if (songName === 'test') {
        setSongs(['Similar Song 1', 'Similar Song 2', 'Similar Song 3']);
        setLoading(false);
      } else {
        setError('No similar songs found!');
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div>
      <Header />
      <SongInput onSearch={fetchSongs} />
      
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      <SongList songs={songs} />
    </div>
  );
};

export default App;