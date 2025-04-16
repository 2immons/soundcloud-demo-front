import { makeAutoObservable } from "mobx";
import axios from "axios";
import {profileStore} from "./Profile";
import {checkResponse, getConfig, getErrors, getToken} from "../utils/utils";

class TracksStore {
    tracks = [
        {
            guid: "123",
            photoUrl: "",
            name: "Моя невеста",
            description: "Описнаие",
            artistName: "Егор Крид",
            seconds: 60,
            commentsCount: 1,
            playsCount: 2,
            likesCount: 3,
            genre: "ROCK",
            streamUrl: "streamUrl",
            liked: true
        },

    ];


    isSidebarVisible = true; // Стартовое состояние

    constructor() {
        makeAutoObservable(this); // Делаем свойства реактивными
    }

    toggleSidebar() {
        this.isSidebarVisible = !this.isSidebarVisible; // Переключаем состояние
    }

    // Получить URL стриминга
    async getTrackStreamingURL(guid) {
        try {
            const response = await axios.get(`http://localhost:8080/api/sounds/stream-url/${guid}`, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }

    // Лайкнуть или дизлайкнуть трек
    async likeTrack(guid) {
        try {
            const response = await axios.post(`http://localhost:8080/api/sounds/like/${guid}`, {}, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }

    // Получить комментарии трека
    async getTrackComments({ page, size, query }, guid) {
        const payload = { page: page, size: size, query: query };
        try {
            const response = await axios.post(`http://localhost:8080/api/sounds/comments/${guid}`, payload, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }

    // Оставить комментарий к треку
    async leftComment(text, guid) {
        const payload = { text: text };
        try {
            const response = await axios.post(`http://localhost:8080/api/sounds/comments/${guid}/add`, payload, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }

    // Получение понравившихся треков
    async getMyLikedTracks({ page, size, query }) {
        const payload = { page: page, size: size, query: query };

        try {
            const response = await axios.post(`http://localhost:8080/api/sounds/liked`, payload, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }

    // Поиск треков по query
    async searchTrack({ page, size, query }) {
        const payload = { page: page, size: size, query: query };

        try {
            const response = await axios.post(`http://localhost:8080/api/sounds/search`, payload, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }

    // Получить топ треков
    async getTopTracks({ page, size, query }) {
        const payload = { page: page, size: size, query: query };

        try {
            const response = await axios.post(`http://localhost:8080/api/sounds/top`, payload, getConfig());
            checkResponse(response)

            this.tracks = response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }
}

export const tracksStore = new TracksStore(); // Экспортируем экземпляр
