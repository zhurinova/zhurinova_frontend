import React, { useState } from 'react';
import './ArtistTable.css'; // Импорт CSS
import {Artist, Exhibit} from'../../Models/Artist.tsx'

// export interface Exhibit {
//   id: number;
//   title: string;
// }

// export interface Artist {
//   id: number;
//   fullName: string;
//   schoolOfPainting: string;
//   dateOfBirth: string;
//   exhibits: Exhibit[];
// }

interface ArtistTableProps {
  artists: Artist[];
}

const ArtistTable: React.FC<ArtistTableProps> = ({ artists }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'fullName',
    direction: 'asc',
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedArtists = [...artists].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof Artist];
    const bValue = b[sortConfig.key as keyof Artist];

    // Обрабатываем сортировку для 'schoolOfPainting' или других строковых значений
    if (sortConfig.key === 'schoolOfPainting') {
      if (aValue === null || bValue === null) return 0;
      return sortConfig.direction === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    }

    // Обработка сортировки для других полей (например, fullName, dateOfBirth)
    const aStringValue = aValue !== null && aValue !== undefined ? aValue.toString().toLowerCase() : '';
    const bStringValue = bValue !== null && bValue !== undefined ? bValue.toString().toLowerCase() : '';

    return sortConfig.direction === 'asc'
      ? aStringValue.localeCompare(bStringValue)
      : bStringValue.localeCompare(aStringValue);
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={() => handleSort('fullName')}>Full Name</th>
          <th onClick={() => handleSort('schoolOfPainting')}>School Of Painting</th>
          <th onClick={() => handleSort('dateOfBirth')}>Date Of Birth</th>
          <th>Exhibits</th>
        </tr>
      </thead>
      <tbody>
        {sortedArtists.map((artist) => (
          <tr key={artist.id}>
            <td>{artist.id}</td>
            <td>{artist.fullName}</td>
            <td>{artist.schoolOfPainting}</td>
            <td>{artist.dateOfBirth}</td>
            <td>{artist.exhibits.map((exhibit) => exhibit.title).join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArtistTable;