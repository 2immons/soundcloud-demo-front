import { makeAutoObservable } from "mobx";
import { profileStore } from "./Profile";
import axios from "axios";

class AuthStore {
    isAuth = false;

    constructor() {
        makeAutoObservable(this); // Делаем свойства реактивными
    }

    toggleSidebar() {
        this.isSidebarVisible = !this.isSidebarVisible; // Переключаем состояние
    }

    async signUp({ nickname, fullName, password, isArtist, file }) {
        const tempPhotoGuid = await profileStore.loadTempPhoto(file)
        const payload = {
            username: nickname,
            password: password,
            name: fullName,
            fileGuid: tempPhotoGuid, // если пока без файла — оставляем пустым
            isArtist: true, // если потом хочешь сделать выбор — легко добавим
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/users/register`, payload);
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            if (error.response) {
                alert(`Ошибка: ${error.response.data.message || error.response.statusText}`);
            } else {
                alert('Ошибка сети или сервера');
            }
        }
    }

    async signIn({ email, password }) {
        const payload = {
            username: email,
            password: password
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/auth/login`, payload);
            if (response.data.success) {
                const { userName, photoUrl, name, isArtist, token } = response.data.data;

                profileStore.setProfile({
                    userName,
                    photoUrl,
                    name,
                    isArtist
                });

                localStorage.setItem('token', token);
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            if (error.response) {
                alert(`Ошибка: ${error.response.data.message || error.response.statusText}`);
            } else {
                alert('Ошибка сети или сервера');
            }
        }
    }
}

export const authStore = new AuthStore(); // Экспортируем экземпляр
