import axios from 'axios';

const API_URL = 'https://localhost:7246/api';

export interface QueryObjectOrder {
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  isDescending?: boolean;
  closed?: boolean;
}

export const login_post = async (login: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/authentication`, {
      login,  
      password,
    });
    return response.data.token; // Предполагаем, что API возвращает токен
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export const getOrders = async (params: QueryObjectOrder) => {
  const response = await axios.get(`${API_URL}/order`, { params });
  return response.data;
};

export const getOrderById = async (orderId: number) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Передаем токен в заголовке
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching order by ID', error);
    throw error;
  }
};

export const createOrder = async (customerId: number, orderDto: { 
  price: number; 
  status: string; 
}) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.post(`${API_URL}/order/${customerId}`, 
      orderDto, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response.data; // Возвращаем данные созданного заказа
  } catch (error) {
    console.error('Error creating order', error);
    throw error;
  }
};

export const updateOrder = async (orderId: number, price: number, status:string) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.put(
      `${API_URL}/order/${orderId}`,
      { price, status }, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating order', error);
    throw error;
  }
};


export const deleteOrder = async (orderId: number) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.delete(
      `${API_URL}/order/${orderId}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Error deleting order', error);
    throw error;
  }
};

export const getCustomers = async () => {
  const response = await axios.get(`${API_URL}/customer`);
  return response.data;
};

export const updateCustomer = async (customerId: number, name: string, address: string, email:string, phone:string) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (!token) {
      throw new Error('Unauthorized: No token found');
    }
  
    try {
      const response = await axios.put(
        `${API_URL}/customer/${customerId}`,
        { name, address, email, phone }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error('Error updating customer', error);
      throw error;
    }
  };

  export const deleteCustomer = async (customerId: number) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Unauthorized: No token found');
    }
  
    try {
      const response = await axios.delete(
        `${API_URL}/customer/${customerId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error('Error deleting customer', error);
      throw error;
    }
  };

  export const getCustomerById = async (customerId: number) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Unauthorized: No token found');
    }
  
    try {
      const response = await axios.get(`${API_URL}/customer/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching customer by ID', error);
      throw error;
    }
  };
  
  export const createCustomer = async ( customerDto: { 
    name: string; 
    address: string; 
    email: string; 
    phone: string; 
  }) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Unauthorized: No token found');
    }
  
    try {
      const response = await axios.post(`${API_URL}/customer`, 
        customerDto, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating customer', error);
      throw error;
    }
  };