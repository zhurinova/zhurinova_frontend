import React, { useState, useEffect } from 'react';
import { getExhibits } from '../../Services/Api.tsx';
import Filters from '../../Components/Filters/Filters.tsx';
import ExhibitTable from '../../Components/ExhibitTable/ExhibitTable.tsx';
import ExhibitCard from '../../Components/ExhibitCard/ExhibitCard.tsx';
import { Exhibit } from '../../Models/Exhibit.tsx'; 
import SellDeleteUpdateExhibit from '../../Components/CRUD/SellDeleteUpdateExhibit.tsx';

import './Exhibits.css';

const Exhibits = () => {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [view, setView] = useState<'table' | 'card'>('table');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const params = filter ? { search: filter } : {};
      try {
        const data = await getExhibits(params);
        setExhibits(data);
      } catch (error) {
        console.error('Error fetching exhibits:', error);
      }
    };
    fetchData();
  }, [filter]);

  return (
    <div className="exhibits-container">
      {/* Контейнер для Filters и SellDeleteUpdateExhibit */}
      <div className="top-section">
        <Filters setExhibits={setExhibits} />
        <SellDeleteUpdateExhibit />
      </div>

      {/* Переключение между режимами через кнопки */}
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
        <ExhibitTable exhibits={exhibits} />
      ) : (
        <div className="cards-container">
          {exhibits.map((exhibit) => (
            <ExhibitCard key={exhibit.Id} exhibit={exhibit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Exhibits;
