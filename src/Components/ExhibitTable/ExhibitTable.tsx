import React, { useState } from 'react';
import './ExhibitTable.css'; // Импорт CSS

interface Artist {
  fullName: string;
}

interface Exhibit {
  id: number;
  title: string;
  yearOfCreation: number;
  price: number;
  technique: string;
  artist: Artist | null;
  dateOfSale: string;
}

interface ExhibitTableProps {
  exhibits: Exhibit[];
}

const ExhibitTable: React.FC<ExhibitTableProps> = ({ exhibits }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'title',
    direction: 'asc',
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedExhibits = [...exhibits].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof Exhibit];
    const bValue = b[sortConfig.key as keyof Exhibit];
    if (sortConfig.key === 'price' || sortConfig.key === 'yearOfCreation') {
      if (aValue === null || bValue === null) return 0;
      return sortConfig.direction === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    }
    const aStringValue = aValue !== null ? aValue.toString().toLowerCase() : '';
    const bStringValue = bValue !== null ? bValue.toString().toLowerCase() : '';
    return sortConfig.direction === 'asc'
      ? aStringValue.localeCompare(bStringValue)
      : bStringValue.localeCompare(aStringValue);
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={() => handleSort('title')}>Title</th>
          <th onClick={() => handleSort('yearOfCreation')}>Year of Creation</th>
          <th onClick={() => handleSort('price')}>Price</th>
          <th onClick={() => handleSort('technique')}>Technique</th>
          {/* <th onClick={() => handleSort('artist')}>Artist</th> */}
          <th onClick={() => handleSort('dateOfSale')}>Date of Sale</th>
        </tr>
      </thead>
      <tbody>
        {sortedExhibits.map((exhibit) => (
          <tr key={exhibit.id}>
            <td>{exhibit.id}</td>
            <td>{exhibit.title}</td>
            <td>{exhibit.yearOfCreation}</td>
            <td>{exhibit.price} $</td>
            <td>{exhibit.technique}</td>
            {/* <td>{exhibit.artist ? exhibit.artist.fullName : ''}</td> */}
            <td>{exhibit.dateOfSale !== '0001-01-01' ? exhibit.dateOfSale : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExhibitTable;
