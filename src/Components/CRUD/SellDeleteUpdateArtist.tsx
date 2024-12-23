import React, { useState } from 'react';
import { 
  deleteArtist, 
  updateArtist, 
  getArtistById, 
  createArtist 
} from '../../Services/Api.tsx'; 
// import './SellDeleteUpdateExhibit.css';

const SellDeleteUpdateArtist = () => {
  const [artistId, setArtistId] = useState<number | string>('');
  const [newFullName, setUpdateName] = useState<number | string>('');
  const [newSchoolOfPainting, setUpdateSchool] = useState<number | string>('');
  const [message, setMessage] = useState<string>('');
  const [artist, setArtist] = useState<any>(null);
  const [action, setAction] = useState<'delete' | 'update' | 'get' | 'create' | null>(null);

  // Состояние для нового экспоната
  const [newArtist, setNewArtist] = useState({
    id:'',
    fullName: '',
    schoolOfPainting: '',
    dateOfBirth: '0001-01-01'
  });

  // Обработчик для получения информации об экспонате по ID
  const handleGetArtist = async () => {
    if (typeof artistId === 'number') {
      try {
        const artistData = await getArtistById(artistId); // Запрашиваем данные экспоната
        setArtist(artistData); // Сохраняем данные в состояние
        setMessage('');
      } catch (error) {
        setMessage('Error fetching artist details.');
        setArtist(null);
      }
    } else {
      setMessage('Please enter a valid ID.');
    }
  };

  // Метод для создания экспоната
  const handleCreateArtist = async () => {
    const { fullName, schoolOfPainting, dateOfBirth, id} = newArtist;

    // Проверяем, что все обязательные поля заполнены
    if (fullName && schoolOfPainting && dateOfBirth && id) {
      try {
        // Преобразуем значения к нужным типам и вызываем API
        await createArtist(Number(artistId), {
          fullName,
          schoolOfPainting,
          dateOfBirth
        });
        setMessage(`Artist "${fullName}" created successfully!`);
        setNewArtist({
          id: '',
          fullName: '',
          schoolOfPainting: '',
          dateOfBirth: ''
        });
      } catch (error) {
        setMessage('Error creating artist.');
      }
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  const handleDelete = async () => {
    if (typeof artistId === 'number') {
      try {
        await deleteArtist(artistId);
        setMessage(`Artist with ID ${artistId} deleted successfully!`);
      } catch (error) {
        setMessage('Error deleting artist.');
      }
    } else {
      setMessage('Please enter a valid ID.');
    }
  };

  const handleUpdate = async () => {
    if (typeof artistId === 'number' && typeof newFullName === 'string' && typeof newSchoolOfPainting === 'string') {
      try {
        await updateArtist(artistId, newFullName, newSchoolOfPainting);
        setMessage(`Artist with ID ${artistId} updated!`);
      } catch (error) {
        setMessage('Error updating artist.');
      }
    } else {
      setMessage('Please enter a valid ID, Full Name and School of Painting.');
    }
  };

  const handleActionChange = (newAction: 'delete' | 'update' | 'get' | 'create') => {
    setAction(newAction);
    setMessage('');
    setArtist(null);
  };

  return (
    <div className="container">
      <h2>Manage Artist</h2>
      <div className="form-group">
        <input
          type="number"
          placeholder="Enter Artist ID"
          value={artistId}
          onChange={(e) => setArtistId(Number(e.target.value))}
          className="input-field"
        />
      </div>

      {action === 'update' && (
        <div className="form-group">
          <input
            type="string"
            placeholder="Enter New Full Name"
            value={newFullName}
            onChange={(e) => setUpdateName(String(e.target.value))}
            className="input-field"
          />
           <input
            type="string"
            placeholder="Enter New School of Painting"
            value={newSchoolOfPainting}
            onChange={(e) => setUpdateSchool(String(e.target.value))}
            className="input-field"
          />
        </div>
      )}

      {action === 'create' && (
        <div className="form-group create-form">
          <input
            type="text"
            placeholder="Enter Full Name"
            value={newArtist.fullName}
            onChange={(e) => setNewArtist({ ...newArtist, fullName: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter School of Painting"
            value={newArtist.schoolOfPainting}
            onChange={(e) => setNewArtist({ ...newArtist, schoolOfPainting: e.target.value })}
            className="input-field"
          />
           <input
            type="date"
            placeholder="Enter Date of Birth"
            value={newArtist.dateOfBirth}
            onChange={(e) => setNewArtist({ ...newArtist, dateOfBirth: e.target.value })}
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
        <button onClick={handleGetArtist} className="btn btn-secondary">
          Fetch Artist Details
        </button>
      )}

      {action === 'create' && (
        <button onClick={handleCreateArtist} className="btn btn-secondary">
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
      {artist && (
        <div className="exhibit-details">
          <h3>artist Details:</h3>
          <ul>
            <li><strong>ID:</strong> {artist.id}</li>
            <li><strong>Full Name:</strong> {artist.fullName}</li>
            <li><strong>School Of Painting:</strong> {artist.schoolOfPainting}</li>
            <li><strong>Date of Birth:</strong> {artist.dateOfBirth}</li>
            <li><strong>Exhibits:</strong>{artist.exhibits.map((exhibit) => exhibit.title).join(', ')}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SellDeleteUpdateArtist;