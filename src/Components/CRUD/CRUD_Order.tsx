import React, { useState } from 'react';
import {
  deleteOrder, 
  updateOrder, 
  getOrderById, 
  createOrder 
} from '../../Services/Api.tsx'; 
import './CRUD_Order.css';

const CRUD_Order = () => {
  const [orderId, setOrderId] = useState<number | string>('');
  const [newPrice, setNewPrice] = useState<number | string>('');
  const [newStatus, setNewStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [order, setOrder] = useState<any>(null);
  const [action, setAction] = useState<'delete' | 'update' | 'get' | 'create' | null>(null);

  const [newOrder, setNewOrder] = useState({
    price: '',
    status: '',
    customerId: '',
  });

  const handleGetOrder = async () => {
    if (typeof orderId === 'number') {
      try {
        const orderData = await getOrderById(orderId); 
        setOrder(orderData);
        setMessage('');
      } catch (error) {
        setMessage('Error fetching order details.');
        setOrder(null);
      }
    } else {
      setMessage('Please enter a valid ID.');
    }
  };

  const handleCreateOrder = async () => {
    const { price, status, customerId } = newOrder;
    if (price && status && customerId) {
      try {
        await createOrder(Number(customerId), {
          price: Number(price),
          status,
        });
        setMessage(`Order "${order.id}" created successfully!`);
        setNewOrder({
            customerId: '',
            price: '',
            status: '',
        });
      } catch (error) {
        //setMessage('Error creating order');
      }
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  const handleDelete = async () => {
    if (typeof orderId === 'number') {
      try {
        await deleteOrder(orderId);
        setMessage(`Order with ID ${orderId} deleted successfully!`);
      } catch (error) {
        setMessage('Error deleting order.');
      }
    } else {
      setMessage('Please enter a valid ID.');
    }
  };

  const handleUpdate = async () => {
    if (typeof orderId === 'number' && typeof newPrice === 'number' && typeof newStatus === 'string') {
      try {
        await updateOrder(orderId, newPrice, newStatus);
        setMessage(`Price of order with ID ${orderId} updated!`);
      } catch (error) {
        setMessage('Error updating order price.');
      }
    } else {
      setMessage('Please enter a valid ID, Price and Status');
    }
  };

  const handleActionChange = (newAction: 'delete' | 'update' | 'get' | 'create') => {
    setAction(newAction);
    setMessage('');
    setOrder(null);
  };

  return (
    <div className="container">
      <h2>Order</h2>
      {action === 'update' && (
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(Number(e.target.value))}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter New Price"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            className="input-field"
          />
          <input
            type="string"
            placeholder="Enter New Status"
            value={newStatus}
            onChange={(e) => setNewStatus(String(e.target.value))}
            className="input-field"
          />
        </div>
      )}
        {action === 'delete' && (
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(Number(e.target.value))}
            className="input-field"
          />
        </div>
      )}

        {action === 'get' && (
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(Number(e.target.value))}
            className="input-field"
          />
        </div>
      )}

      {action === 'create' && (
        <div className="form-group create-form">
          <input
            type="number"
            placeholder="Enter Price"
            value={newOrder.price}
            onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter Status"
            value={newOrder.status}
            onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter Customer ID"
            value={newOrder.customerId}
            onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value })}
            className="input-field"
          />
        </div>
      )}

      <div className="action-buttons">
        <button onClick={() => handleActionChange('get')} className="btn">
          Get Order
        </button>
        <button onClick={() => handleActionChange('update')} className="btn">
          Update
        </button>
        <button onClick={() => handleActionChange('create')} className="btn">
          Create Order
        </button>
        <button onClick={() => handleActionChange('delete')} className="btn">
          Delete
        </button>
      </div>

      {action === 'get' && (
        <button onClick={handleGetOrder} className="btn btn-secondary">
          Fetch Order Details
        </button>
      )}

      {action === 'create' && (
        <button onClick={handleCreateOrder} className="btn btn-secondary">
          Confirm Creation
        </button>
      )}

      {action === 'update' && (
        <button onClick={handleUpdate} className="btn btn-secondary">
          Confirm Order Update
        </button>
      )}
      {action === 'delete' && (
        <button onClick={handleDelete} className="btn btn-secondary">
          Confirm Deletion
        </button>
      )}

      {message && <p className="message">{message}</p>}
      {order && (
        <div className="order-details">
          <h3>Order Details:</h3>
          <ul>
            <li><strong>ID:</strong> {order.id}</li>
            <li><strong>Price:</strong> {order.price} ₽</li>
            <li><strong>Status:</strong> {order.status}</li>
            <li><strong>DateTime:</strong>{order.dateTime}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CRUD_Order;