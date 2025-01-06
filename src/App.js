import React, { useState } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import SongList from './components/SongList';
import ArtistList from './components/ArtistList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import axios from 'axios';

const App = () => {
  const [searchedItem, setSearchedItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('track');

  const fetchData = async (query, type) => {
    setLoading(true);
    setError('');
    setSearchedItem(null);
    setSimilarItems([]);

    try {
      const response = await axios.get(`https://kurtisz18.github.io/api/search/`, {
        params: { 
          q: query,
          type: type
        },
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      if (type === 'track') {
        setSearchedItem(response.data.track);
        setSimilarItems(response.data.similar_tracks || []);
      } else {
        setSearchedItem(response.data.artist);
        setSimilarItems(response.data.similar_artists || []);
      }
      setSearchType(type);
    } catch (err) {
      console.error('Error searching:', err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.details ||
        `Error fetching ${type} data.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <SearchInput onSearch={fetchData} />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {(searchedItem || similarItems.length > 0) && (
          searchType === 'track' ? (
            <SongList 
              searchedTrack={searchedItem} 
              similarTracks={similarItems}
            />
          ) : (
            <ArtistList 
              searchedArtist={searchedItem} 
              similarArtists={similarItems}
            />
          )
        )}
      </main>
    </div>
  );
};

export default App;