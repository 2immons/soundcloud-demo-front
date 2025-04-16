import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import './Favorites.css';
import Header from "../components/layout/Header"; // Create this CSS file for styling
import { authStore } from '../store/Auth';
import Track from "../components/Track";
import { tracksStore } from "../store/Tracks";

const Favorites = () => {
    return (
        <div className="page-container">
            <Header>SoundCloud Demo</Header>
            <div className="page-content">
                {authStore.isSidebarVisible && <Sidebar />}
                <section>
                    <h2>Избранные треки</h2>
                    <div className="track-list">
                        {tracksStore.tracks.map((track, index) => (
                            <Track key={index} track={track} index={index} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Favorites;
