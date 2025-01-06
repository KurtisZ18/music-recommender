import React, { useState } from 'react';
import './SearchInput.css';

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('track');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query) {
      alert('Please enter a search term');
      return;
    }
    onSearch(query, searchType);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-controls">
        <input
          type="text"
          placeholder={`Enter ${searchType} name`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <select 
          value={searchType} 
          onChange={(e) => setSearchType(e.target.value)}
          className="search-type"
        >
          <option value="track">Track</option>
          <option value="artist">Artist</option>
        </select>
        <button type="submit" className="search-button">Search</button>
      </div>
    </form>
  );
};

export default SearchInput;