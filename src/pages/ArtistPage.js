import React, {useEffect, useState} from 'react';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/common/Button'; // Import Button component
import Header from '../components/layout/Header'; // Import Button component
import './ArtistPage.css'; // We'll create this CSS file for styling
import artistImage from '../assets/svg/mocks/artist.svg';
import { authStore } from '../store/Auth';
import {tracksStore} from "../store/Tracks";
import Track from "../components/Track";

import {artistsStore} from "../store/Artists";
import {useParams} from "react-router-dom";

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
      <div className="page-container">
        <Header>SoundCloud Demo</Header>
        <div className="page-content">
          {authStore.isSidebarVisible && <Sidebar />}
          <section>
            <div className="artist-info">
              <img src={artistImage} alt="Artist" className="artist-photo"/>
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
        </div>
      </div>
  );
};

export default ArtistPage;
