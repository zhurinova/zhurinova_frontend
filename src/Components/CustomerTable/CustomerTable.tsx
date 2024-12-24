import React, { useState } from 'react';
import './CustomerTable.css'; // Импорт CSS
import { Customer } from '../../Models/Customer.tsx';

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Customer; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof Customer) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCustomers = sortConfig
    ? [...customers].sort((a, b) => {
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
    : customers;

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>ID</th>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('address')}>Address</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {sortedCustomers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.address}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
