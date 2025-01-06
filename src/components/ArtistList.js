import React from 'react';
import './ArtistList.css';

const formatNumber = (count) => {
  if (!count) return 'N/A';
  return parseInt(count).toLocaleString();
};

const FeaturedArtist = ({ artist }) => {
  return (
    <div className="featured-artist">
      <div className="featured-artist-info">
        <h2>{artist.name}</h2>
        <p><strong>Playcount:</strong> {formatNumber(artist.stats?.playcount)}</p>
        {artist.tags?.tag && (
          <p><strong>Tags:</strong> {artist.tags.tag.map(tag => tag.name).join(', ')}</p>
        )}
        {artist.url && (
          <a href={artist.url} target="_blank" rel="noopener noreferrer" className="last-fm-link">
            View on Last.fm
          </a>
        )}
      </div>
    </div>
  );
};

const ArtistList = ({ searchedArtist, similarArtists }) => {
  return (
    <div className="artist-list-container">
      {searchedArtist && <FeaturedArtist artist={searchedArtist} />}
      
      {similarArtists && similarArtists.length > 0 && (
        <div>
          <h2 className="similar-artists-title">Similar Artists</h2>
          <div className="artists-grid">
            {similarArtists.map((artist, index) => (
              <div key={`${artist.name}-${index}`} className="artist-card">
                <h3>{artist.name}</h3>
                <p><strong>Match:</strong> {(parseFloat(artist.match) * 100).toFixed(1)}%</p>
                {artist.url && (
                  <a href={artist.url} target="_blank" rel="noopener noreferrer" className="last-fm-link">
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

export default ArtistList;