import React, { useState, useRef } from 'react';
import './Player.css';
import { observer } from 'mobx-react';
import { profileStore } from "../../store/Profile";

import nextBtn from '../../assets/svg/player/next.svg';
import backBtn from '../../assets/svg/player/back.svg';
import playBtn from '../../assets/svg/player/play.svg';
import pauseBtn from '../../assets/svg/player/play.svg';

import shareBtn from '../../assets/svg/player/share.svg';
import commentBtn from '../../assets/svg/player/comment.svg';
import likeBtn from '../../assets/svg/player/like.svg';

import lesnikMock from '../../assets/lesnik-mock.mp3';
import {formatTime} from "../../utils/utils"; // Import the audio file
import playerTrack from "../../assets/svg/mocks/player-track.png";

import { useEffect } from 'react';

const Player = observer(() => {
    const { currentTrack } = profileStore;
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(1);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!isDragging) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    useEffect(() => {
        if (!audioRef.current) return;

        const interval = setInterval(() => {
            if (!isDragging && audioRef.current) {
                const progressValue = (audioRef.current.currentTime / duration) * 100;
                setProgress(progressValue);
            }
        }, 1);

        return () => clearInterval(interval);
    }, [isDragging, duration]);

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setProgress(newTime);
        audioRef.current.currentTime = (newTime / 100) * duration;
    };
    
    const handleVolumeChange = (e) => {
        let newVolume = parseFloat(e.target.value);
        newVolume = Math.max(0, Math.min(1, newVolume));
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'm' || e.key === 'M') {
                if (audioRef.current.volume === 0) {
                    audioRef.current.volume = volume;
                    setVolume(volume);
                } else {
                    audioRef.current.volume = 0;
                    setVolume(0);
                }
            }

            if (e.key === "Space") {
                e.preventDefault();
                handlePlayPause();
            }

            if (e.key === 'ArrowUp') {
                let newVolume = Math.min(volume + 0.05, 1);
                audioRef.current.volume = newVolume;
                setVolume(newVolume);
            } else if (e.key === 'ArrowDown') {
                let newVolume = Math.max(volume - 0.05, 0);
                audioRef.current.volume = newVolume;
                setVolume(newVolume);
            }

            if (e.key === 'ArrowRight') {
                audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 5, duration);
            } else if (e.key === 'ArrowLeft') {
                audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 5, 0); // Перемотка назад
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [volume, duration]);

    return (
        <footer>
            <div className="content content--player">
                <div className="track">
                    <img src={playerTrack} alt=""/>
                    <div className="track-info">
                        <p>{currentTrack.trackTitle}</p>
                        <p className="artist-name">{currentTrack.artistName}</p>
                    </div>
                </div>
                <div className="player">
                    <div className="player-buttons">
                        <button><img src={backBtn} alt=""/></button>
                        <button onClick={handlePlayPause}>
                            <img src={isPlaying ? pauseBtn : playBtn} alt=""/>
                        </button>
                        <button><img src={nextBtn} alt=""/></button>
                    </div>
                    <div className="time-wrapper">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.01"
                            value={progress}
                            onChange={handleProgressChange}
                            className="slider progress-slider"
                        />
                        <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="slider volume-slider"
                    />
                    <div className="additional-buttons">
                        <button><img src={commentBtn} alt=""/></button>
                        <button><img src={likeBtn} alt=""/></button>
                        <button><img src={shareBtn} alt=""/></button>
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                src={lesnikMock} // Use the imported audio file
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
        </footer>
    );
});

export default Player;