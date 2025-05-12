import React, { useState, useRef } from "react";
import "./Header.css";
import alarmIcon from "../../assets/svg/alarm-icon.svg";
import searchIcon from "../../assets/svg/search-icon.svg";
import { authStore } from "../../store/Auth";
import Button from "../common/Button";
import AuthModal from "../modals/AuthModal";
import trackImg from "../../assets/svg/mocks/player-track.png";
import { profileStore } from "../../store/Profile";

const Header = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchContainerRef = useRef(null);

    const openAuthModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchFocus = () => {
        setIsSearchActive(true);
    };

    const handleSearchBlur = () => {
        setTimeout(() => {
            if (!searchContainerRef.current.contains(document.activeElement)) {
                setIsSearchActive(false);
            }
        }, 200);
    };

    const handleSearchChange = async (event) => {
        const query = event.target.value;
        if (query.length > 0) {
            setIsLoading(true);
            const results = await profileStore.searchTracks(query);
            setSearchResults(results);
            setIsLoading(false);
        } else {
            setSearchResults([]);
        }
    };

    const startTrack = async (track) => {
        console.log("startTrack called with track:", track);
        await profileStore.setCurrentTrack(track);
        console.log("Current track set to:", profileStore.currentTrack);
    };

    return (
        <header>
            {isModalOpen && <AuthModal type={modalType} onClose={closeAuthModal} />}
            <h1>{children}</h1>
            {!authStore.isAuth && <Button onClick={() => openAuthModal("signin")}>Вход</Button>}
            {!authStore.isAuth && <Button onClick={() => openAuthModal("signup")}>Регистрация</Button>}
            <div className="toolbar">
                <div
                    className={`search-container ${isSearchActive ? "active" : ""}`}
                    ref={searchContainerRef}
                >
                    <img src={searchIcon} alt="Search Icon" className="search-icon" />
                    <input
                        type="text"
                        placeholder="поиск песни, исполнителя..."
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        onChange={handleSearchChange}
                    />
                    {isSearchActive && (
                        <div className="recent-searches">
                            {isLoading ? <div className="loading-spinner">Загрузка...</div>
                            : <>
                                <p>{searchResults.length > 0 ? "Результаты поиска:" : "Недавно искали:"}</p>
                                {(searchResults.length > 0 ? searchResults : profileStore.recentSearches).map((track, index) => (
                                    <div key={index} className="recent-track" onClick={() => startTrack(track)}>
                                        <img src={trackImg} className="recent-track-image" alt=""/>
                                        <div className="recent-track-info">
                                            <p className="recent-track-title">{track.trackTitle}</p>
                                            <p className="recent-tract-artist">{track.artistName}</p>
                                        </div>
                                    </div>
                                ))}
                            </>
                            }
                        </div>
                    )}
                </div>
                <button className="alarm-btn">
                    <img src={alarmIcon} alt="Alarm Icon"/>
                </button>
            </div>
        </header>
    );
};

export default Header;
