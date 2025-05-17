import React from 'react';
import { useState } from 'react';
import artistImage from "../assets/svg/mocks/artist1.png"; // We'll create this CSS file for styling
import Track from "../components/Track";
import Button from '../components/common/Button'; // Import Button component
import NewTrackModal from '../components/modals/NewTrackModal';
import StatsModal from '../components/modals/StatsModal';
import { profileStore } from "../store/Profile";
import './ArtistPage.css';

const Profile = () => {
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isNewTrackModalOpen, setIsNewTrackModalOpen] = useState(false);

  return (
    <section>
      <div className="artist-info">
        <img src={artistImage} alt="Artist" className="artist-photo"/>
        <div className="artist-details">
          <p>Исполнитель</p>
          <h2>{profileStore.profile.name}</h2>
          <p>{profileStore.profile.auditionsPerMonth} прослушиваний за месяц</p>
          <p>{profileStore.profile.subscribers} подписок</p>

          <div className="action-buttons">
            <Button type={"SOLID"}>Слушать</Button>
            <Button type={"SOLID"} onClick={() => setIsNewTrackModalOpen(true)}>Добавить трек</Button>
            <Button type={"SOLID"} onClick={() => setIsStatsModalOpen(true)}>Статистика</Button>
          </div>
        </div>
      </div>
      <div className="track-list">
        <h3>Треки</h3>
        {profileStore.profile.tracks.map((track, index) => (
            <Track key={index} track={track} index={index}/>
        ))}
      </div>
    {isStatsModalOpen && <StatsModal onClose={() => setIsStatsModalOpen(false)} />}
    {isNewTrackModalOpen && <NewTrackModal onClose={() => setIsNewTrackModalOpen(false)} />}
    </section>
  );
};

export default Profile; 