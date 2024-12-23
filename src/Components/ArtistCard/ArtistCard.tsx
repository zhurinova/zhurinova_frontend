import React from 'react';
import { Artist } from '../../Models/Artist.tsx';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className="artist-card">
      <h3>{artist.FullName}</h3>
      <p>{artist.SchoolOfPainting}</p>
      <p>Date of Birth: {artist.DateOfBirth}</p>
    </div>
  );
};

export default ArtistCard;
