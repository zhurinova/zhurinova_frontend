import React from 'react'; 
import { Order } from '../../Models/Order.tsx';
import './OrderCard.css'; // Импорт CSS

const OrderCard = ({ order }) => (
  <div className="card" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
    <h3>{order.title}</h3>
    <img 
        alt={order.title}
    />
    <p><strong>ID</strong> {order.id}</p>
    <p><strong>Status:</strong> {order.status}</p>
    <p><strong>Price:</strong> {order.price} ₽</p>
    <p><strong>DateTime:</strong> {order.dateTime}</p>
  </div>
);

export default OrderCard;