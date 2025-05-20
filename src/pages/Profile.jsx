import React, { memo } from 'react';
import { useState } from 'react';
import Track from "../components/Track";
import Button from '../components/common/Button'; // Import Button component
import NewTrackModal from '../components/modals/NewTrackModal';
import StatsModal from '../components/modals/StatsModal';
import './ArtistPage.css';
import { profileStore } from "../store/Profile";
import { observer } from 'mobx-react'

const ProfileView = observer(({ profileState }) => {
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isNewTrackModalOpen, setIsNewTrackModalOpen] = useState(false);

  return (
    <section>
      <div className="artist-info">
        <img src={profileState.photoUrl} alt="Artist" className="artist-photo"/>
        <div className="artist-details">
          <p>Исполнитель</p>
          <h2>{profileState.userName}</h2>
          <p>{profileState.profile.auditionsPerMonth} прослушиваний за месяц</p>
          <p>{profileState.profile.subscribers} подписок</p>

          <div className="action-buttons">
            <Button type={"SOLID"}>Слушать</Button>
            <Button type={"SOLID"} onClick={() => setIsNewTrackModalOpen(true)}>Добавить трек</Button>
            <Button type={"SOLID"} onClick={() => setIsStatsModalOpen(true)}>Статистика</Button>
          </div>
        </div>
      </div>
      <div className="track-list">
        <h3>Треки</h3>
        {profileState.profile.tracks.map((track, index) => (
            <Track key={index} track={track} index={index}/>
        ))}
      </div>
    {isStatsModalOpen && <StatsModal onClose={() => setIsStatsModalOpen(false)} />}
    {isNewTrackModalOpen && <NewTrackModal onClose={() => setIsNewTrackModalOpen(false)} />}
    </section>
  );
});

const Profile  = memo(() => <ProfileView profileState={profileStore} />);

export default Profile;