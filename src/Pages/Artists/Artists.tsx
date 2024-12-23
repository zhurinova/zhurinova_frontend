import React, { useState, useEffect } from 'react';
import { getArtists, getArtistsWithAveragePrice } from '../../Services/Api.tsx';
import ArtistTable from '../../Components/ArtistTable/ArtistTable.tsx';
import ArtistWithAvgPriceTable from '../../Components/ArtistTable/ArtistWithAvgPriceTable.tsx';
import { Artist, Artist2 } from '../../Models/Artist.tsx'; 
import SellDeleteUpdateArtist from '../../Components/CRUD/SellDeleteUpdateArtist.tsx';
import './Artists.css'; // Импорт стилей для чекбокса

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artistWithAvgPrice, setArtistWithAvgPrice] = useState<Artist2[]>([]);
  const [showAvgPriceTable, setShowAvgPriceTable] = useState(true); // Состояние для отображения таблицы

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists({});
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    const fetchArtistWithAvgPrice = async () => {
      try {
        const data = await getArtistsWithAveragePrice();
        setArtistWithAvgPrice(data);
      } catch (error) {
        console.error('Error fetching artists with average price:', error);
      }
    };
    fetchArtistWithAvgPrice();
  }, []);

  return (
    <div className="artists-container">
      <div className="top-section">
        <SellDeleteUpdateArtist /> 
      </div>

      <ArtistTable artists={artists} />

      <div className="checkbox-container">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={showAvgPriceTable}
            onChange={() => setShowAvgPriceTable(!showAvgPriceTable)} // Переключаем видимость
          />
          <span className="checkmark"></span>
          Show Artists with Average Price
        </label>
      </div>

      {showAvgPriceTable && <ArtistWithAvgPriceTable artistWithAvgPrice={artistWithAvgPrice} />}
    </div>
  );
};

export default Artists;
