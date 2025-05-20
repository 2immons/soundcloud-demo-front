import React, { useState } from 'react';
import { profileStore } from '../../store/Profile';
import Button from '../common/Button';

import './Modal.css';

const NewTrackModal = ({ onClose }) => {
    const [trackName, setTrackName] = useState('');
    const [trackFile, setTrackFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleTrackNameChange = (e) => setTrackName(e.target.value);
    const handleTrackFileChange = (e) => setTrackFile(e.target.files[0]);
    const handleCoverImageChange = (e) => setCoverImage(e.target.files[0]);

    const handleSubmit = async () => {
        try {
            const imageGuid = await profileStore.loadTempPhoto(coverImage);
            const soundGuid = await profileStore.loadTempSound(trackFile);
            // Логика загрузки трека
            // TODO: loadTempSound не возвращает Guid файла
            console.log('Track Name:', trackName);
            console.log('Track File:', trackFile, soundGuid);
            console.log('Cover Image:', coverImage, imageGuid);
            onClose();
        } catch (error) {
            alert('Что пошло не так');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Добавить трек</h2>
                <input type="text" placeholder="Название трека" value={trackName} onChange={handleTrackNameChange}/>
                <p>Аудио</p>
                <input type="file" onChange={handleTrackFileChange}/>
                <p>Обложка</p>
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleCoverImageChange}
                />
                <Button type="SOLID" onClick={handleSubmit}>Загрузить</Button>
            </div>
        </div>
    );
};

export default NewTrackModal;