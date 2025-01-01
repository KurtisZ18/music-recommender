import React from 'react';

const SongList = ({ songs }) => {
  if (songs.length === 0) {
    return <p>No similar songs found.</p>;
  }

  return (
    <ul>
      {songs.map((song, index) => (
        <li key={index}>{song}</li>
      ))}
    </ul>
  );
};

export default SongList;