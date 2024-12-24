import React, { useState } from 'react';
import './OrderTable.css'; // Импорт CSS
import { Order } from '../../Models/Order.tsx';

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof Order) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = sortConfig
    ? [...orders].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const aStringValue = aValue?.toString().toLowerCase() || '';
        const bStringValue = bValue?.toString().toLowerCase() || '';

        return sortConfig.direction === 'asc'
          ? aStringValue.localeCompare(bStringValue)
          : bStringValue.localeCompare(aStringValue);
      })
    : orders;

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort('id')}>ID</th>
          <th onClick={() => handleSort('price')}>Price</th>
          <th onClick={() => handleSort('status')}>Status</th>
          <th onClick={() => handleSort('dateTime')}>DateTime</th>
        </tr>
      </thead>
      <tbody>
        {sortedOrders.map((order, index) => (
          <tr key={index}>
            <td>{order.id}</td>
            <td>{order.price} ₽</td>
            <td>{order.status}</td>
            <td>{order.dateTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
