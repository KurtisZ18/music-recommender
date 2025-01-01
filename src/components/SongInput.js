import React, { useState } from 'react';

const SongInput = ({ onSearch }) => {
  const [songName, setSongName] = useState('');

  const handleInputChange = (e) => {
    setSongName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(songName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={songName}
        onChange={handleInputChange}
        placeholder="Enter a song name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SongInput;