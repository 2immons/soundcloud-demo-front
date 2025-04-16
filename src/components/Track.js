import React, { useState } from 'react';
import './Track.css'; // We'll create this CSS file for styling

import trackImg from '../assets/svg/mocks/player-track.png';

import shareBtn from '../assets/svg/player/share.svg';
import commentBtn from '../assets/svg/player/comment.svg';
import likeBtn from '../assets/svg/player/like.svg';
import {formatTime} from "../utils/utils";
const Track = ({ track, index }) => {
    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const likeTrack = () => {
        console.log("like")
    }

    const shareTrack = () => {
        console.log("share")
    }

    const comments = Array.isArray(track.comments) ? track.comments : [];

    return (
        <div className="track-item">
            <p className="track-index">{index + 1}</p>
            <img src={trackImg} className="track-image" alt=""/>
            <p>{track.name}</p>
            <p>{track.artistName}</p>
            <p className="track-time">{formatTime(track.seconds)}</p>
            <div className="tools">
                <div className="tools-item tools-item--comments" onClick={toggleComments}>
                    <p>{track.commentsCount}</p>
                    <img src={commentBtn} alt=""/>
                </div>
                <div className="tools-item tools-item--likes" onClick={() => likeTrack()}>
                    <p>{track.likesCount}</p>
                    <img src={likeBtn} alt=""/>
                </div>
                <div className="tools-item tools-item--share" onClick={() => shareTrack()}>
                    <img src={shareBtn} alt=""/>
                </div>
            </div>
            {showComments && (
                <div className="comments-section">
                    <h4>Комментарии</h4>
                    <div className="comments-list">
                        {comments.map((comment, idx) => (
                            <div key={idx} className="comment">
                                <div className="comment-info">
                                    <p className="comment-author">{comment.authorName}</p>
                                    <p className="comment-date">{comment.date}</p>
                                </div>
                                <p className="comment-text">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                    <textarea placeholder="Написать комментарий..." />
                    <button onClick={() => console.log("Add comment")}>Отправить</button>
                </div>
            )}
        </div>
    );
};

export default Track;