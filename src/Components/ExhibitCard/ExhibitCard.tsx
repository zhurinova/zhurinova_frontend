import React from 'react'; 
import { Exhibit } from '../../Models/Exhibit.tsx';
import './ExhibitCard.css'; // Импорт CSS

interface ExhibitCardProps {
  exhibit: Exhibit;
}

const ExhibitCard = ({ exhibit }) => (
  <div className="card" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
    <h3>{exhibit.title}</h3>
    <img 
        src={exhibit.imageUrl} 
        alt={exhibit.title}  // Используем 'title' или 'Exhibit Image' как alt
        className="card-image" 
    />
    <p><strong>Year:</strong> {exhibit.yearOfCreation}</p>
    <p><strong>Price:</strong> {exhibit.price} $</p>
    <p><strong>Technique:</strong> {exhibit.technique}</p>
    {/* <p><strong>Artist:</strong> {exhibit.artist ? exhibit.artist.fullName : ''}</p> */}
    <p><strong>Date of Sale:</strong> {exhibit.dateOfSale !== '0001-01-01' ? exhibit.dateOfSale : ''}</p>
  </div>
);

export default ExhibitCard;
