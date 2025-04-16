import { makeAutoObservable } from "mobx";
import axios from 'axios';
import {checkResponse, fileToBase64, getConfig, getErrors} from "../utils/utils";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class ProfileStore {
    userName = "";
    photoUrl = "";
    name = "";
    isArtist = false;
    isSidebarVisible = false;

    currentTrack = {
        trackId: 1,
        trackTitle: "Потрачу",
        artistName: "OG Pashka",
        trackImage: "123"
    }

    recentSearches = [
        {
            trackId: 1,
            trackTitle: "Потрачу",
            artistName: "OG Pashka 2",
            trackImage: "123"
        },
        {
            trackId: 1,
            trackTitle: "Потрачу",
            artistName: "OG Pashka 2",
            trackImage: "123"
        },
        {
            trackId: 1,
            trackTitle: "Потрачу",
            artistName: "OG Pashka",
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
        name: "OG Danchiks",

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
            { image: "", name: "Тот самый момент", artist: "Григорий Лепс", durationSeconds: 210, comments: 12, likes: 40 },
            { image: "", name: "Скажи мне правду", artist: "L'One & Мот", durationSeconds: 220, comments: 35, likes: 18 },
            { image: "", name: "Море внутри", artist: "Рыбин", durationSeconds: 240, comments: 45, likes: 23 },
            { image: "", name: "В небе любовь", artist: "Кино", durationSeconds: 200, comments: 30, likes: 33 },
            { image: "", name: "Когда ты рядом", artist: "Guf", durationSeconds: 180, comments: 40, likes: 47 },
        ]
    }

    constructor() {
        makeAutoObservable(this); // Делаем свойства реактивными
    }

    toggleSidebar() {
        this.isSidebarVisible = !this.isSidebarVisible; // Переключаем состояние
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
