import { makeAutoObservable } from "mobx";
import axios from 'axios';
import {checkResponse, getFileUrl, getConfig, getErrors, getToken} from "../utils/utils";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class ProfileStore {
    userName = "";
    photoUrl = "";
    name = "";
    isArtist = false;
    isSidebarVisible = false;

    currentTrack = {
        trackId: 1,
        trackTitle: "Moonlit Serenade",
        artistName: "Luna Wave",
        trackImage: "123"
    }

    recentSearches = [
        {
            trackId: 1,
            trackTitle: "Moonlit Serenade",
            artistName: "Luna Wave",
            trackImage: "123"
        },
        {
            trackId: 1,
            trackTitle: "Cybernetic Pulse",
            artistName: "Vortex King",
            trackImage: "123"
        },
        {
            trackId: 1,
            trackTitle: "Ocean of Stars",
            artistName: "Luna Wave",
            trackImage: "123"
        }
    ];

    tracksDatabase = [
        { trackId: 2, trackTitle: "Трек 1", artistName: "Артист 1", trackImage: "image1" },
        { trackId: 3, trackTitle: "Трек 2", artistName: "Артист 2", trackImage: "image2" },
        { trackId: 4, trackTitle: "Трек 3", artistName: "Артист 3", trackImage: "image3" },
        // Добавьте больше треков по необходимости
    ];

    profile = {
        fio: "Даниил Павлович Щелкин",
        name: "Shadow Beats",

        //email: "chipsiandpivo@gmail.com",
        //tel: "+79372220012",

        auditionsPerMonth: 12345,
        subscribers: 100,

        stats: [
            {
                date: "2025-01-01",
                subscribers: 100
            },
            {
                date: "2025-02-01",
                subscribers: 150
            },
            {
                date: "2025-03-01",
                subscribers: 200
            },
            {
                date: "2025-04-01",
                subscribers: 250
            },
        ],
        tracks: [
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
                commentsCount: 45,
                playsCount: 0,
                likesCount: 88,
                genre: "",
                streamUrl: "",
                liked: false
            },
        ]
    }

    constructor() {
        if (getToken() !== `null`) {
            this.getProfile().then((profileData) => {
                this.userName = profileData?.userName ?? '';
                this.name = profileData?.name ?? '';
                this.isArtist = profileData?.isArtist ?? '';
                return getFileUrl(profileData?.photoUrl)
            }).then((photo) => this.photoUrl = photo ?? '');
        };
        makeAutoObservable(this); // Делаем свойства реактивными
    }

    toggleSidebar() {
        this.isSidebarVisible = !this.isSidebarVisible; // Переключаем состояние
    }

    async getProfile() {
        const response = await axios.get('http://localhost:8080/api/users/profile', getConfig());
        checkResponse(response);
        return response.data.data;
    }

    // Загрузка трека
    async loadTrack({ soundName, description, soundFileGuid, photoGuid, genre }) {
        const payload = { soundName: soundName, description: description, soundFileGuid: soundFileGuid, photoGuid: photoGuid, genre: "ROCK" };

        try {
            const response = await axios.post(`http://localhost:8080/api/sounds/load`, payload, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }

    // Загрузить дорожку трека
    async loadTempSound(file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`http://localhost:8080/rest/file/load-temp-sound`, formData, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }

    // Загрузить картинку
    async loadTempPhoto(file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`http://localhost:8080/rest/file/load-temp-photo`, formData, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }

    setProfile({ userName, photoUrl, name, isArtist }) {
        this.userName = userName;
        this.photoUrl = photoUrl;
        this.name = name;
        this.isArtist = isArtist;
        this.isSidebarVisible = true;
    }

    async setCurrentTrack(track) {
        console.log("Setting current track:", track);
        this.currentTrack = track;
    }
}

export const profileStore = new ProfileStore(); // Экспортируем экземпляр
