import { useEffect, useState } from 'react';
import Button from '../components/common/Button'; // Import Button component
import Track from "../components/Track";
import './ArtistPage.css'; // We'll create this CSS file for styling

import { useParams } from "react-router-dom";
import { artistsStore } from "../store/Artists";

const ArtistPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    console.log(id)
    const fetchedArtist = artistsStore.getArtistById(id);
    setArtist(fetchedArtist);
    console.log(fetchedArtist)
  }, [id]);

  // Добавляем проверку на состояние artist
  if (!artist) {
    return <div>Загружается...</div>; // Показываем индикатор загрузки
  }

  return (
    <section>
      <div className="artist-info">
        <img src={artist.image} alt={artist.name} className="artist-photo"/>
        <div className="artist-details">
          <p>Исполнитель</p>
          <h2>{artist.name}</h2> {/* Отображаем имя артиста из данных */}
          <p>{artist.auditionsPerMonth} прослушиваний за месяц</p> {/* Отображаем количество прослушиваний */}
          <p>{artist.subscribers} подписок</p> {/* Отображаем количество подписчиков */}
          <div className="action-buttons">
            <Button type={"SOLID"}>Слушать</Button>
            <Button>Лайк</Button>
          </div>
        </div>
      </div>

      <div className="track-list">
        <h3>Треки</h3>
        {artist.tracks.map((track, index) => (
            <Track key={index} track={track} index={index}/>
        ))}
      </div>
    </section>
  );
};

export default ArtistPage;
