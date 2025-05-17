import React from "react";
import { observer } from "mobx-react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import Track from "../components/Track";
import { artistsStore } from "../store/Artists";
import { tracksStore } from "../store/Tracks";
import './HomePage.css';

const HomePage = () => {
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
    );
};
export default observer(HomePage);