import React, {useEffect} from 'react';
import Sidebar from '../components/layout/Sidebar';
import './HomePage.css';
import Header from "../components/layout/Header"; // Create this CSS file for styling
import { authStore } from '../store/Auth';
import artistImg from "../assets/svg/mocks/artist.svg";
import { tracksStore } from "../store/Tracks";
import { artistsStore } from "../store/Artists";
import Track from "../components/Track";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

const HomePage = () => {
    const listens = 300

    const popularArtists = artistsStore.getPopularArtists();

    const navigate = useNavigate();
    const navigateToArtist = (artist) => {
        console.log(artist)
        navigate(`/artist/${artist.artistId}`);
    }

    useEffect(() => {
        const fetchTopTracks = async () => {
            await tracksStore.getTopTracks({ page: 0, size: 10, query: '' });
        };
        fetchTopTracks();
    }, []);

    return (
        <div className="page-container">
            <Header>SoundCloud Demo</Header>
            <div className="page-content">
                {authStore.isSidebarVisible && <Sidebar/>}
                <section>
                    <h3>Популярные исполнители</h3>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={5}
                        loop={true}
                    >
                        {popularArtists.map(artist => (
                            <SwiperSlide key={artist.artistId} onClick={() => navigateToArtist(artist)}>
                                <div className="artist-card">
                                    <img src={artist.image} alt={artist.name} className="artist-image"/>
                                    <p className="artist-name">{artist.name}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="page-container--home">
                        <h3 className="chart-title">Чарт</h3>
                        <div className="track-list">
                            {tracksStore.tracks.map((track, index) => (
                                <Track key={index} track={track} index={index}/>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
export default observer(HomePage);