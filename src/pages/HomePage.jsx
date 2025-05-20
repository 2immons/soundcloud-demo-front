import React, { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import Track from "../components/Track";
import { artistsStore } from "../store/Artists";
import { tracksStore } from "../store/Tracks";
import { getFileUrl } from "../utils/utils";
import { authStore } from "../store/Auth";

import 'swiper/css';
import './HomePage.css';
import 'swiper/css/navigation';

const HomePage = () => {
    const [popularArtists, setPopularArtists] = useState([]);
    const [isPopularArtistsLoading, setIsPopularArtistsLoading] = useState(true);
    const [isPopularArtistsError, setIsPopularArtistsError] = useState(false);

    const getPopularArtists = async () => {
        const data = await artistsStore.getPopularArtists({ page: 0, size: 10, query: '' });
        return await Promise.all(data.map(async (artist) => {
            artist.imageUrl = await getFileUrl(artist.imageUrl);
            return artist;
        }));
    }

    useEffect(() => {
        if (!authStore.isAuth) {
            setTimeout(() => {
                setIsPopularArtistsError(true);
                setIsPopularArtistsLoading(false);
            }, 5000);
            return;
        }

        getPopularArtists().then((data) => {
            setPopularArtists(data);
        })
        .catch(() => {
            setIsPopularArtistsError(true);
        })
        .finally(() => setIsPopularArtistsLoading(false));
    }, []);

    const navigate = useNavigate();
    const navigateToArtist = (artist) => {
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
            {isPopularArtistsLoading && <p>Загрузка...</p>}
            {!isPopularArtistsLoading && isPopularArtistsError && <p>Ошибка загрузки...</p>}
            {!isPopularArtistsLoading && (
                <Swiper
                    spaceBetween={20}
                    slidesPerView={5}
                    loop={true}
                >
                    {popularArtists.map((artist, index) => (
                        <SwiperSlide key={`${artist.artistName}-${index}`} onClick={() => navigateToArtist(artist)}>
                            <div className="artist-card">
                                <img src={artist.imageUrl} alt={artist.artistName} className="artist-image"/>
                                <p className="artist-name">{artist.artistName}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

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