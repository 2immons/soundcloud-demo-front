import { makeAutoObservable } from "mobx";
import axios from "axios";
import {profileStore} from "./Profile";
import {checkResponse, getConfig, getErrors, getToken} from "../utils/utils";

class TracksStore {
    tracks = [
        {
            guid: "1",
            photoUrl: "",
            name: "Midnight Echo",
            description: "",
            artistName: "Shadow Beats",
            seconds: 195,
            commentsCount: 28,
            playsCount: 0, // Добавлено, так как в исходных данных нет
            likesCount: 75,
            genre: "", // Добавлено, так как в исходных данных нет
            streamUrl: "", // Добавлено, так как в исходных данных нет
            liked: false // Добавлено, так как в исходных данных нет
        },
        {
            guid: "2",
            photoUrl: "",
            name: "Phantom Groove",
            description: "",
            artistName: "Shadow Beats",
            seconds: 210,
            commentsCount: 42,
            playsCount: 0,
            likesCount: 91,
            genre: "",
            streamUrl: "",
            liked: false
        },
        {
            guid: "3",
            photoUrl: "",
            name: "Lost in the Static",
            description: "",
            artistName: "Shadow Beats",
            seconds: 225,
            commentsCount: 35,
            playsCount: 0,
            likesCount: 64,
            genre: "",
            streamUrl: "",
            liked: false
        },
        // Продолжение для остальных треков Shadow Beats
        {
            guid: "6",
            photoUrl: "",
            name: "Ocean of Stars",
            description: "",
            artistName: "Luna Wave",
            seconds: 220,
            commentsCount: 2,
            playsCount: 0,
            likesCount: 88,
            genre: "",
            streamUrl: "",
            liked: true,
            comments: [
                {
                    commentAuthor: "Daniil",
                    date: "12.04.2025",
                    text: "Классный трек!"
                },
                {
                    commentAuthor: "Pavel",
                    date: "12.04.2025",
                    text: "Мне понравилась концовка!"
                },
            ]
        },
        {
            guid: "7",
            photoUrl: "",
            name: "Moonlit Serenade",
            description: "",
            artistName: "Luna Wave",
            seconds: 205,
            commentsCount: 2,
            playsCount: 0,
            likesCount: 72,
            genre: "",
            streamUrl: "",
            liked: true,
        },
        // Продолжение для остальных треков Luna Wave
        {
            guid: "12",
            photoUrl: "",
            name: "Cybernetic Pulse",
            description: "",
            artistName: "Vortex King",
            seconds: 240,
            commentsCount: 60,
            playsCount: 0,
            likesCount: 110,
            genre: "",
            streamUrl: "",
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
