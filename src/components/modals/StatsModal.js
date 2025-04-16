import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { profileStore } from '../../store/Profile';
import './Modal.css';
import Button from '../common/Button';

// Регистрация компонентов
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatsModal = ({ onClose }) => {
    const data = {
        labels: profileStore.profile.stats.map(stat => stat.date),
        datasets: [
            {
                label: 'Подписчики',
                data: profileStore.profile.stats.map(stat => stat.subscribers),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Статистика</h2>
                <Line data={data}/>
                <Button type="SOLID" onClick={onClose}>Закрыть</Button>
            </div>
        </div>
    );
};

export default StatsModal;