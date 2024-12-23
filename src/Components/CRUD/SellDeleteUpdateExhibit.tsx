import React, { useState } from 'react';
import { 
  sellExhibit, 
  deleteExhibit, 
  updateExhibitPrice, 
  getExhibitById, 
  createExhibit 
} from '../../Services/Api.tsx'; 
import './SellDeleteUpdateExhibit.css';

const SellDeleteUpdateExhibit = () => {
  const [exhibitId, setExhibitId] = useState<number | string>('');
  const [newPrice, setNewPrice] = useState<number | string>('');
  const [message, setMessage] = useState<string>('');
  const [exhibit, setExhibit] = useState<any>(null);
  const [action, setAction] = useState<'sell' | 'delete' | 'update' | 'get' | 'create' | null>(null);

  // Состояние для нового экспоната
  const [newExhibit, setNewExhibit] = useState({
    title: '',
    yearOfCreation: '',
    price: '',
    technique: '',
    dateOfSale: '0001-01-01',
    imageUrl: '',
    artistId: '',
  });

  // Обработчик для получения информации об экспонате по ID
  const handleGetExhibit = async () => {
    if (typeof exhibitId === 'number') {
      try {
        const exhibitData = await getExhibitById(exhibitId); // Запрашиваем данные экспоната
        setExhibit(exhibitData); // Сохраняем данные в состояние
        setMessage('');
      } catch (error) {
        setMessage('Error fetching exhibit details.');
        setExhibit(null);
      }
    } else {
      setMessage('Please enter a valid ID.');
    }
  };

  // Метод для создания экспоната
  const handleCreateExhibit = async () => {
    const { title, yearOfCreation, price, technique, dateOfSale, imageUrl, artistId } = newExhibit;

    // Проверяем, что все обязательные поля заполнены
    if (title && yearOfCreation && price && technique && imageUrl && artistId) {
      try {
        // Преобразуем значения к нужным типам и вызываем API
        await createExhibit(Number(artistId), {
          title,
          yearOfCreation: Number(yearOfCreation),
          price: Number(price),
          technique,
          dateOfSale,
          imageUrl,
        });
        setMessage(`Exhibit "${title}" created successfully!`);
        setNewExhibit({
          title: '',
          yearOfCreation: '',
          price: '',
          technique: '',
          dateOfSale: '0001-01-01',
          imageUrl: '',
          artistId: '',
        });
      } catch (error) {
        setMessage('Error creating exhibit.');
      }
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  const handleSell = async () => {
    if (typeof exhibitId === 'number') {
      try {
        await sellExhibit(exhibitId);
        setMessage(`Exhibit with ID ${exhibitId} sold successfully!`);
      } catch (error) {
        setMessage('Error selling exhibit.');
      }
    } else {
      setMessage('Please enter a valid ID.');
    }
  };

  const handleDelete = async () => {
    if (typeof exhibitId === 'number') {
      try {
        await deleteExhibit(exhibitId);
        setMessage(`Exhibit with ID ${exhibitId} deleted successfully!`);
      } catch (error) {
        setMessage('Error deleting exhibit.');
      }
    } else {
      setMessage('Please enter a valid ID.');
    }
  };

  const handleUpdatePrice = async () => {
    if (typeof exhibitId === 'number' && typeof newPrice === 'number') {
      try {
        await updateExhibitPrice(exhibitId, newPrice);
        setMessage(`Price of exhibit with ID ${exhibitId} updated to ${newPrice}!`);
      } catch (error) {
        setMessage('Error updating exhibit price.');
      }
    } else {
      setMessage('Please enter a valid ID and price.');
    }
  };

  const handleActionChange = (newAction: 'sell' | 'delete' | 'update' | 'get' | 'create') => {
    setAction(newAction);
    setMessage('');
    setExhibit(null);
  };

  return (
    <div className="container">
      <h2>Manage Exhibit</h2>
      <div className="form-group">
        <input
          type="number"
          placeholder="Enter Exhibit ID"
          value={exhibitId}
          onChange={(e) => setExhibitId(Number(e.target.value))}
          className="input-field"
        />
      </div>

      {action === 'update' && (
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter New Price"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            className="input-field"
          />
        </div>
      )}

      {action === 'create' && (
        <div className="form-group create-form">
          <input
            type="text"
            placeholder="Enter Title"
            value={newExhibit.title}
            onChange={(e) => setNewExhibit({ ...newExhibit, title: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter Year of Creation"
            value={newExhibit.yearOfCreation}
            onChange={(e) => setNewExhibit({ ...newExhibit, yearOfCreation: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter Price"
            value={newExhibit.price}
            onChange={(e) => setNewExhibit({ ...newExhibit, price: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter Technique"
            value={newExhibit.technique}
            onChange={(e) => setNewExhibit({ ...newExhibit, technique: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter Image URL"
            value={newExhibit.imageUrl}
            onChange={(e) => setNewExhibit({ ...newExhibit, imageUrl: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter Artist ID"
            value={newExhibit.artistId}
            onChange={(e) => setNewExhibit({ ...newExhibit, artistId: e.target.value })}
            className="input-field"
          />
        </div>
      )}

      <div className="action-buttons">
        <button onClick={() => handleActionChange('get')} className="btn">
          Get Exhibit
        </button>
        <button onClick={() => handleActionChange('sell')} className="btn">
          Sell
        </button>
        <button onClick={() => handleActionChange('delete')} className="btn">
          Delete
        </button>
        <button onClick={() => handleActionChange('update')} className="btn">
          Update Price
        </button>
        <button onClick={() => handleActionChange('create')} className="btn">
          Create Exhibit
        </button>
      </div>

      {action === 'get' && (
        <button onClick={handleGetExhibit} className="btn btn-secondary">
          Fetch Exhibit Details
        </button>
      )}

      {action === 'create' && (
        <button onClick={handleCreateExhibit} className="btn btn-secondary">
          Confirm Creation
        </button>
      )}

      {action === 'delete' && (
        <button onClick={handleDelete} className="btn btn-secondary">
          Confirm Deletion
        </button>
      )}

      {action === 'update' && (
        <button onClick={handleUpdatePrice} className="btn btn-secondary">
          Confirm Price Update
        </button>
      )}

      {action === 'sell' && (
        <button onClick={handleSell} className="btn btn-secondary">
          Confirm Sale
        </button>
      )}

      {message && <p className="message">{message}</p>}
      {exhibit && (
        <div className="exhibit-details">
          <h3>Exhibit Details:</h3>
          <ul>
            <li><strong>ID:</strong> {exhibit.id}</li>
            <li><strong>Title:</strong> {exhibit.title}</li>
            <li><strong>Technique:</strong> {exhibit.technique}</li>
            <li><strong>Price:</strong> ${exhibit.price}</li>
            {exhibit.dateOfSale && <li><strong>Date of Sale:</strong> {exhibit.dateOfSale}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SellDeleteUpdateExhibit;


// import React, { useState } from 'react';
// import { sellExhibit, deleteExhibit, updateExhibitPrice, getExhibitById } from '../../Services/Api.tsx'; // Импортируем функции API
// import './SellDeleteUpdateExhibit.css'

// const SellDeleteUpdateExhibit = () => {
//   const [exhibitId, setExhibitId] = useState<number | string>(''); // Состояние для ID экспоната
//   const [newPrice, setNewPrice] = useState<number | string>(''); // Состояние для новой цены
//   const [message, setMessage] = useState<string>(''); // Сообщение об успешной операции или ошибке
//   const [exhibit, setExhibit] = useState<any>(null); // Состояние для хранения данных конкретного экспоната
//   const [action, setAction] = useState<'sell' | 'delete' | 'update' | 'get' | null>(null); // Определяем действие

//   // Обработчик для получения информации об экспонате по ID
//   const handleGetExhibit = async () => {
//     if (typeof exhibitId === 'number') {
//       try {
//         const exhibitData = await getExhibitById(exhibitId); // Запрашиваем данные экспоната
//         setExhibit(exhibitData); // Сохраняем данные в состояние
//         setMessage('');
//       } catch (error) {
//         setMessage('Error fetching exhibit details.');
//         setExhibit(null);
//       }
//     } else {
//       setMessage('Please enter a valid ID.');
//     }
//   };

//   // Обработчики других действий
//   const handleSell = async () => {
//     if (typeof exhibitId === 'number') {
//       try {
//         await sellExhibit(exhibitId);
//         setMessage(`Exhibit with ID ${exhibitId} sold successfully!`);
//       } catch (error) {
//         setMessage('Error selling exhibit.');
//       }
//     } else {
//       setMessage('Please enter a valid ID.');
//     }
//   };

//   const handleDelete = async () => {
//     if (typeof exhibitId === 'number') {
//       try {
//         await deleteExhibit(exhibitId);
//         setMessage(`Exhibit with ID ${exhibitId} deleted successfully!`);
//       } catch (error) {
//         setMessage('Error deleting exhibit.');
//       }
//     } else {
//       setMessage('Please enter a valid ID.');
//     }
//   };

//   const handleUpdatePrice = async () => {
//     if (typeof exhibitId === 'number' && typeof newPrice === 'number') {
//       try {
//         await updateExhibitPrice(exhibitId, newPrice);
//         setMessage(`Price of exhibit with ID ${exhibitId} updated to ${newPrice}!`);
//       } catch (error) {
//         setMessage('Error updating exhibit price.');
//       }
//     } else {
//       setMessage('Please enter a valid ID and price.');
//     }
//   };

//   const handleActionChange = (newAction: 'sell' | 'delete' | 'update' | 'get') => {
//     setAction(newAction);
//     setMessage('');
//     setExhibit(null);
//   };

//   return (
//     <div className="container">
//       <h2>Manage Exhibit</h2>
//       <div className="form-group">
//         <input
//           type="number"
//           placeholder="Enter Exhibit ID"
//           value={exhibitId}
//           onChange={(e) => setExhibitId(Number(e.target.value))}
//           className="input-field"
//         />
//       </div>

//       {action === 'update' && (
//         <div className="form-group">
//           <input
//             type="number"
//             placeholder="Enter New Price"
//             value={newPrice}
//             onChange={(e) => setNewPrice(Number(e.target.value))}
//             className="input-field"
//           />
//         </div>
//       )}

//       <div className="action-buttons">
//         <button onClick={() => handleActionChange('get')} className="btn btn-info">
//           Get Exhibit
//         </button>
//         <button onClick={() => handleActionChange('sell')} className="btn btn-success">
//           Sell
//         </button>
//         <button onClick={() => handleActionChange('delete')} className="btn btn-danger">
//           Delete
//         </button>
//         <button onClick={() => handleActionChange('update')} className="btn btn-primary">
//           Update Price
//         </button>
//       </div>

//       {action === 'get' && (
//         <button onClick={handleGetExhibit} className="btn btn-purple">
//           Fetch Exhibit Details
//         </button>
//       )}

//       {action === 'sell' && (
//         <button onClick={handleSell} className="btn btn-success">
//           Confirm Sale
//         </button>
//       )}
//       {action === 'delete' && (
//         <button onClick={handleDelete} className="btn btn-danger">
//           Confirm Deletion
//         </button>
//       )}
//       {action === 'update' && (
//         <button onClick={handleUpdatePrice} className="btn btn-primary">
//           Confirm Price Update
//         </button>
//       )}

//       {message && <p className="message">{message}</p>} {/* Сообщение об успешной операции или ошибке */}
//       {exhibit && (
//         <div className="exhibit-details">
//           <h3>Exhibit Details:</h3>
//           <ul>
//             <li><strong>ID:</strong> {exhibit.id}</li>
//             <li><strong>Title:</strong> {exhibit.title}</li>
//             <li><strong>Technique:</strong> {exhibit.technique}</li>
//             <li><strong>Price:</strong> ${exhibit.price}</li>
//             <li><strong>Sold:</strong> {exhibit.sold ? 'Yes' : 'No'}</li>
//             {exhibit.dateOfSale && <li><strong>Date of Sale:</strong> {exhibit.dateOfSale}</li>}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SellDeleteUpdateExhibit;
