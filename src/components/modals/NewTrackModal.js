import React, { useState } from 'react';
import './Modal.css';
import Button from '../common/Button';

const NewTrackModal = ({ onClose }) => {
    const [trackName, setTrackName] = useState('');
    const [trackFile, setTrackFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleTrackNameChange = (e) => setTrackName(e.target.value);
    const handleTrackFileChange = (e) => setTrackFile(e.target.files[0]);
    const handleCoverImageChange = (e) => setCoverImage(e.target.files[0]);

    const handleSubmit = () => {
        // Логика загрузки трека
        console.log('Track Name:', trackName);
        console.log('Track File:', trackFile);
        console.log('Cover Image:', coverImage);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Добавить трек</h2>
                <input type="text" placeholder="Название трека" value={trackName} onChange={handleTrackNameChange}/>
                <input type="file" onChange={handleTrackFileChange}/>
                <input type="file" onChange={handleCoverImageChange}/>
                <Button type="SOLID" onClick={handleSubmit}>Загрузить</Button>
            </div>
        </div>
    );
};

export default NewTrackModal;