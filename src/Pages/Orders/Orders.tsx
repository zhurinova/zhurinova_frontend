import React, { useState, useEffect } from 'react';
import { getOrders } from '../../Services/Api.tsx';
import OrderTable from '../../Components/OrderTable/OrderTable.tsx';
import OrderCard from '../../Components/OrderCard/OrderCard.tsx';
import { Order } from '../../Models/Order.tsx'; 
import CRUD_Order from '../../Components/CRUD/CRUD_Order.tsx';
import Filters from '../../Components/Filters/Filter.tsx';

import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [view, setView] = useState<'table' | 'card'>('table');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrders({});
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="orders-container">
        <div className="top-section">
          <Filters setOrders={setOrders} />
           <CRUD_Order />
        </div>
       <div className="view-toggle-container">
        <button 
          className={view === 'table' ? 'active' : ''} 
          onClick={() => setView('table')}
        >
          Table View
        </button>
        <button 
          className={view === 'card' ? 'active' : ''} 
          onClick={() => setView('card')}
        >
          Card View
        </button>
      </div>

      {view === 'table' ? (
        <OrderTable orders={orders} />
      ) : (
        <div className="cards-container">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
        )}
    </div>
  );
};

export default Orders;
