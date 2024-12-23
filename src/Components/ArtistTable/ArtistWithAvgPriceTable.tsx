import React from 'react';
import { Artist2 } from '../../Models/Artist.tsx';

interface ArtistWithAvgPriceTableProps {
  artistWithAvgPrice: Artist2[];
}

const ArtistWithAvgPriceTable: React.FC<ArtistWithAvgPriceTableProps> = ({ artistWithAvgPrice }) => {
  return (
    <div className="artist-with-avg-price-container">
      <h2>Artists with Average Prices</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Average Price</th>
            <th>Number of Works</th>
          </tr>
        </thead>
        <tbody>
          {artistWithAvgPrice.map((artist, index) => (
            <tr key={index}>
              <td>{artist.fullName}</td>
              <td>{artist.averagePrice}</td>
              <td>{artist.numberOfWorks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistWithAvgPriceTable;
