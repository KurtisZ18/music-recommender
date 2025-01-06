import React from 'react';
import './SongList.css';

const formatNumber = (count) => {
  if (!count) return 'N/A';
  return parseInt(count).toLocaleString();
};

const FeaturedSong = ({ song }) => {
  return (
    <div className="featured-song">
      <div className="featured-song-info">
        <h2>{song.name}</h2>
        <p><strong>Artist:</strong> {song.artist?.name || song.artist}</p>
        <p><strong>Playcount:</strong> {formatNumber(song.playcount)}</p>
        {song.url && (
          <a href={song.url} target="_blank" rel="noopener noreferrer" className="last-fm-link">
            View on Last.fm
          </a>
        )}
      </div>
    </div>
  );
};

const SongList = ({ searchedTrack, similarTracks }) => {
  return (
    <div className="song-list-container">
      {searchedTrack && <FeaturedSong song={searchedTrack} />}
      
      {similarTracks && similarTracks.length > 0 && (
        <div>
          <h2 className="similar-tracks-title">Similar Tracks</h2>
          <div className="songs-grid">
            {similarTracks.map((song, index) => (
              <div key={`${song.name}-${song.artist}-${index}`} className="song-card">
                <h3>{song.name}</h3>
                <p><strong>Artist:</strong> {song.artist?.name || song.artist}</p>
                <p><strong>Playcount:</strong> {formatNumber(song.playcount)}</p>
                {song.url && (
                  <a href={song.url} target="_blank" rel="noopener noreferrer" className="last-fm-link">
                    View on Last.fm
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongList;