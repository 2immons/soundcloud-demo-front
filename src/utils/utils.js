import axios from "axios";

export const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const checkResponse = (response) => {
    if (!response.data.success) {
        const errorMessage = Array.isArray(response.data.errors)
            ? response.data.errors.join(', ')
            : response.data.errors || 'Неизвестная ошибка';
        throw new Error(errorMessage);
    }
}

export const getErrors = (error) => {
    if (error.response && error.response.data) {
        const err = error.response.data;
        const errorMessage = Array.isArray(err.errors)
            ? err.errors.join(', ')
            : err.message || err.statusText || 'Ошибка от сервера';
        alert(`Ошибка: ${errorMessage}`);
    } else if (error.message) {
        alert(`Ошибка: ${error.message}`);
    } else {
        alert('Ошибка сети или сервера');
    }
}

export const getToken = () => {
    return `${localStorage.getItem('token')}`
}

export const getConfig = () => {
    return { headers: { Authorization: getToken() } }
}

export const getFileUrl = async (fileDir) => {
    const config = getConfig();
    config.responseType = 'blob';
    const response = await axios.get(`http://localhost:8080${fileDir}`, config);
    return URL.createObjectURL(response.data);
}

export const arrayBufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}