import React, { useState } from 'react';
import { getOrders } from '../../Services/Api.tsx';
import './Filter.css';

interface QueryObjectOrder {
  minPrice?: number;
  maxPrice?: number;
  closed?: boolean;
}

const Filters = ({ setOrders }: { setOrders: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [closed, setClosed] = useState<boolean | undefined>(undefined);  // Убедитесь, что initial state правильный

  const handleSearch = async () => {
    const queryParams: QueryObjectOrder = { minPrice, maxPrice, closed };

    try {
      // Получаем все заказы с фильтрами
      const data = await getOrders(queryParams);

      // Фильтруем данные по статусу
      const filteredData = data.filter((order: any) => {
        const matchesStatus = order.status.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Применяем дополнительные фильтры по цене и состоянию заказа
        const matchesPrice = (minPrice === 0 || order.price >= minPrice) && (maxPrice === 0 || order.price <= maxPrice);
        const matchesClosed = closed === undefined || order.closed === closed;
        
        // Возвращаем заказ, если все условия выполнены
        return matchesStatus && matchesPrice && matchesClosed;
      });

      setOrders(filteredData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="filters-container">
      <h2>Sort Orders</h2>
      <div className="filter-item">
        <input
          type="text"
          placeholder="Search by status"
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
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default Filters;
