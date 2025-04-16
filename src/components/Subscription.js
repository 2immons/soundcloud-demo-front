import React from 'react';
import './Subscription.css';
import Button from "./common/Button";
import trackImg from "../assets/svg/mocks/player-track.png"; // We'll create this CSS file for styling
import { useNavigate } from "react-router-dom";

const Subscription = ({ subscription, onClick, type }) => {
    const navigate = useNavigate();
    const navigateToArtist = () => {
        navigate(`/artist/${subscription.artistId}`);
    }
    const unsubscribeFromArtist = () => {
        console.log(subscription.artistId)
    }

    return (
        <div className="subscription">
            <div className="subscription-artist">
                <img src={trackImg} className="subscription-image" alt=""/>
                {subscription.name}
            </div>
            <div className="subscription-buttons">
                <Button type="SOLID" onClick={() => navigateToArtist()}>Подробнее</Button>
                <Button type="SOLID" onClick={() => unsubscribeFromArtist()}>Отписаться</Button>
            </div>
        </div>
    );
};

export default Subscription;