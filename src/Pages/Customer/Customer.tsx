import React, { useState, useEffect } from 'react';
 import { getCustomers} from '../../Services/Api.tsx';
import CustomerTable from '../../Components/CustomerTable/CustomerTable.tsx';
import { Customer } from '../../Models/Customer.tsx'; 
import './Customer.css'; 
import CRUD_Customer from '../../Components/CRUD/CRUD_Customer.tsx';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);


  return (
    <div className="customers-container">
      <div className="top-section">
        <CRUD_Customer/>
      </div>
      <CustomerTable customers={customers} />
      <div className="checkbox-container">
        <label className="custom-checkbox">
        </label>
      </div>
    </div>
  );
};

export default Customers;