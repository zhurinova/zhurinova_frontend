import React, { useState } from 'react';
import { 
  deleteCustomer, 
  updateCustomer, 
  getCustomerById, 
  createCustomer 
} from '../../Services/Api.tsx'; 
import './CRUD_Order.tsx';

const CRUD_Customer = () => {
  const [customerId, setCustomerId] = useState<number | string>('');
  const [newName, setUpdateName] = useState<number | string>('');
  const [newAddress, setUpdateAddress] = useState<number | string>('');
  const [newEmail, setUpdateEmail] = useState<number | string>('');
  const [newPhone, setUpdatePhone] = useState<number | string>('');
  const [message, setMessage] = useState<string>('');
  const [customer, setCustomer] = useState<any>(null);
  const [action, setAction] = useState<'delete' | 'update' | 'get' | 'create' | null>(null);

  const [newCustomer, setNewCustomer] = useState({
    id:'',
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const handleGetCustomer = async () => {
    if (typeof customerId === 'number') {
      try {
        const customerData = await getCustomerById(customerId);
        setCustomer(customerData);
        setMessage('');
      } catch (error) {
        setMessage('Error fetching customer details.');
        setCustomer(null);
      }
    } else {
      setMessage('Please enter a valid ID.');
    }
  };

  const handleCreateCustomer = async () => {
    const { name, address, email, phone, id} = newCustomer;

    // Проверяем, что все обязательные поля заполнены
    if (name && address && email && phone) {
      try {
        // Преобразуем значения к нужным типам и вызываем API
        await createCustomer({
          name,
          address,
          email,
          phone
        });
        setMessage(`Customer "${name}" created successfully!`);
        setNewCustomer({
          id: '',
          name: '',
          address: '',
          email: '',
          phone: '',
        });
      } catch (error) {
        setMessage('Error creating customer.');
      }
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  const handleDelete = async () => {
    if (typeof customerId === 'number') {
      try {
        await deleteCustomer(customerId);
        setMessage(`Customer with ID ${customerId} deleted successfully!`);
      } catch (error) {
        setMessage('Error deleting customer.');
      }
    } else {
      setMessage('Please enter a valid ID.');
    }
  };

  const handleUpdate = async () => {
    if (typeof customerId === 'number' && typeof newName === 'string' && typeof newAddress === 'string'
        && typeof newEmail === 'string' && typeof newPhone === 'string'
    ) {
      try {
        await updateCustomer(customerId, newName, newAddress, newEmail, newPhone);
        setMessage(`Customer with ID ${customerId} updated!`);
      } catch (error) {
        setMessage('Error updating customer.');
      }
    } else {
      setMessage('Please enter a valid ID, Name, Address, Email, Phone.');
    }
  };

  const handleActionChange = (newAction: 'delete' | 'update' | 'get' | 'create') => {
    setAction(newAction);
    setMessage('');
    setCustomer(null);
  };

  return (
    <div className="container">
      <h2>Customer</h2>
      {action === 'get' && (
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(Number(e.target.value))}
            className="input-field"
          />
      </div >
    )}

      {action === 'delete' && (
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(Number(e.target.value))}
            className="input-field"
          />
      </div >
    )}
    
      {action === 'update' && (
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(Number(e.target.value))}
            className="input-field"
          />
          <input
            type="string"
            placeholder="Enter New Name"
            value={newName}
            onChange={(e) => setUpdateName(String(e.target.value))}
            className="input-field"
          />
           <input
            type="string"
            placeholder="Enter New Address"
            value={newAddress}
            onChange={(e) => setUpdateAddress(String(e.target.value))}
            className="input-field"
          />
            <input
            type="string"
            placeholder="Enter New Email"
            value={newEmail}
            onChange={(e) => setUpdateEmail(String(e.target.value))}
            className="input-field"
          />
            <input
            type="string"
            placeholder="Enter New Phone"
            value={newPhone}
            onChange={(e) => setUpdatePhone(String(e.target.value))}
            className="input-field"
          />
        </div>
      )}



      {action === 'create' && (
        <div className="form-group create-form">
          <input
            type="text"
            placeholder="Enter Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter Address"
            value={newCustomer.address}
            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter Phone"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            className="input-field"
          />
        </div>
      )}

      <div className="action-buttons">
        <button onClick={() => handleActionChange('get')} className="btn">
          Get 
        </button>
        <button onClick={() => handleActionChange('delete')} className="btn">
          Delete
        </button>
        <button onClick={() => handleActionChange('update')} className="btn">
          Update 
        </button>
        <button onClick={() => handleActionChange('create')} className="btn">
          Create 
        </button>
      </div>

      {action === 'get' && (
        <button onClick={handleGetCustomer} className="btn btn-secondary">
          Fetch Customer Details
        </button>
      )}

      {action === 'create' && (
        <button onClick={handleCreateCustomer} className="btn btn-secondary">
          Confirm Creation
        </button>
      )}

      {action === 'delete' && (
        <button onClick={handleDelete} className="btn btn-secondary">
          Confirm Deletion
        </button>
      )}

      {action === 'update' && (
        <button onClick={handleUpdate} className="btn btn-secondary">
          Confirm Update
        </button>
      )}

      {message && <p className="message">{message}</p>}
      {customer && (
        <div className="customer-details">
          <h3>Customer Details:</h3>
          <ul>
            <li><strong>ID:</strong> {customer.id}</li>
            <li><strong>Name:</strong> {customer.name}</li>
            <li><strong>Address:</strong> {customer.address}</li>
            <li><strong>Email:</strong> {customer.email}</li>
            <li><strong>Phone:</strong> {customer.phone}</li>
            <li><strong>Orders:</strong>{customer.orders.map((order) => order.id).join(', ')}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CRUD_Customer;