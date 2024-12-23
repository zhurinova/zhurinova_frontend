import axios from 'axios';

const API_URL = 'https://localhost:7203/api';

export interface QueryObjectExhibit {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  isDescending?: boolean;
  sold?: boolean;
}

export interface QueryObjectArtist {
  schoolOfPainting?: string;
  fullName?: string;
  sortBy?: string;
  isDescending?: boolean;
}

export const getExhibits = async (params: QueryObjectExhibit) => {
  const response = await axios.get(`${API_URL}/exhibit`, { params });
  return response.data;
};

export const deleteExhibit = async (exhibitId: number) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.delete(
      `${API_URL}/exhibit/${exhibitId}`, // URL для удаления экспоната
      {
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
        },
      }
    );
    return response.data; // Возвращаем ответ от сервера (удаленный экспонат)
  } catch (error) {
    console.error('Error deleting exhibit', error);
    throw error;
  }
};

export const sellExhibit = async (exhibitId: number) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  const today = new Date().toISOString(); // Текущая дата в формате ISO

  try {
    const response = await axios.put(
      `${API_URL}/exhibit/${exhibitId}/sell-exhibit`,
      { dateOfSale: today },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
        },
      }
    );
    return response.data; // возвращаем обновленные данные
  } catch (error) {
    console.error('Error selling exhibit', error);
    throw error;
  }
};

export const updateExhibitPrice = async (exhibitId: number, price: number) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.put(
      `${API_URL}/exhibit/${exhibitId}`,
      { price }, // Отправляем новую цену
      {
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
        },
      }
    );
    return response.data; // Возвращаем обновленные данные
  } catch (error) {
    console.error('Error updating price', error);
    throw error;
  }
};

export const getExhibitById = async (exhibitId: number) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/exhibit/${exhibitId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Передаем токен в заголовке
      },
    });
    return response.data; // Возвращаем данные экспоната
  } catch (error) {
    console.error('Error fetching exhibit by ID', error);
    throw error;
  }
};

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

export const createExhibit = async (artistId: number, exhibitDto: { 
  title: string; 
  yearOfCreation: number; 
  price: number; 
  technique: string; 
  dateOfSale: string; 
  imageUrl: string;
}) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.post(`${API_URL}/exhibit/${artistId}`, 
      exhibitDto, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response.data; // Возвращаем данные созданного экспоната
  } catch (error) {
    console.error('Error creating exhibit', error);
    throw error;
  }
};

export const getArtists = async (params: QueryObjectArtist) => {
    const response = await axios.get(`${API_URL}/artist`, { params });
    return response.data;
  };

  export const getArtistsWithAveragePrice = async () => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (!token) {
      throw new Error('Unauthorized: No token found');
    }
  
    try {
      const response = await axios.get(`${API_URL}/artist/with-average-price`, {
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
        },
      });
      return response.data; // Возвращаем данные экспоната
    } catch (error) {
      console.error('Error GET', error);
      throw error;
    }
  };


export const deleteArtist = async (artistId: number) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.delete(
      `${API_URL}/artist/${artistId}`, // URL для удаления экспоната
      {
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
        },
      }
    );
    return response.data; // Возвращаем ответ от сервера (удаленный экспонат)
  } catch (error) {
    console.error('Error deleting artist', error);
    throw error;
  }
};

export const updateArtist = async (artistId: number, fullName: string, schoolOfPainting: string) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.put(
      `${API_URL}/artist/${artistId}`,
      { fullName, schoolOfPainting }, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
        },
      }
    );
    return response.data; // Возвращаем обновленные данные
  } catch (error) {
    console.error('Error updating artist', error);
    throw error;
  }
};

export const getArtistById = async (artistId: number) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/artist/${artistId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Передаем токен в заголовке
      },
    });
    return response.data; // Возвращаем данные экспоната
  } catch (error) {
    console.error('Error fetching artist by ID', error);
    throw error;
  }
};

export const createArtist = async (artistId: number, artistDto: { 
  fullName: string; 
  schoolOfPainting: string; 
  dateOfBirth: string; 
}) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.post(`${API_URL}/artist`, 
      artistDto, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response.data; // Возвращаем данные созданного экспоната
  } catch (error) {
    console.error('Error creating artist', error);
    throw error;
  }
};

// export const getArtists = async (params) => {
//   const response = await axios.get(`${API_URL}/artist`, { params });
//   return response.data;
// };

// export const getArtists = async (params: { search?: string }) => {
//   try {
//     const query = params.search ? `?search=${params.search}` : ''; // Формируем запрос
//     const response = await fetch(`/api/artists${query}`);
//     const data = await response.json();
//     return data; // Возвращаем данные
//   } catch (error) {
//     console.error('Error fetching artists:', error);
//     return []; // Если ошибка, возвращаем пустой массив
//   }
// };


// Другие методы работы с API
