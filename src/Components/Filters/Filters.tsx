import React, { useState } from 'react';
import { getExhibits } from '../../Services/Api.tsx';
import './Filters.css';

interface QueryObjectExhibit {
  minPrice?: number;
  maxPrice?: number;
  sold?: boolean;
}

const Filters = ({ setExhibits }: { setExhibits: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sold, setSold] = useState<boolean>();

  const handleSearch = async () => {
    const queryParams: QueryObjectExhibit = { minPrice, maxPrice, sold };

    try {
      const data = await getExhibits(queryParams);
      const filteredData = data.filter((exhibit: any) =>
        exhibit.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setExhibits(filteredData);
    } catch (error) {
      console.error('Error fetching exhibits:', error);
    }
  };

  return (
    <div className="filters-container">
      <h2>Sort Exhibit</h2>
      <div className="filter-item">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-item price-container">
        <div className="price-group">
          <label htmlFor="minPrice">Min Price</label>
          <input
            id="minPrice"
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="filter-input"
          />
        </div>
        <div className="price-group">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            id="maxPrice"
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="filter-input"
          />
        </div>
      </div>

      <div className="filter-item">
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={sold}
            onChange={(e) => setSold(e.target.checked)}
          />
          Sold
        </label>
      </div>

      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default Filters;
