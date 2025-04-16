import { makeAutoObservable } from "mobx";
import {checkResponse, getConfig, getErrors} from "../utils/utils";
import axios from "axios";

class ArtistsStore {
    artists = [
        {
            artistId: 1,
            name: "OG Pashka",
            image: "path/to/image1.jpg",
            auditionsPerMonth: 12345,
            subscribers: 100,

            tracks: [
                { image: "", name: "Тот самый момент", artist: "Григорий Лепс", durationSeconds: 210, comments: 12, likes: 40 },
                { image: "", name: "Скажи мне правду", artist: "L'One & Мот", durationSeconds: 220, comments: 35, likes: 18 },
                { image: "", name: "Море внутри", artist: "Рыбин", durationSeconds: 240, comments: 45, likes: 23 },
                { image: "", name: "В небе любовь", artist: "Кино", durationSeconds: 200, comments: 30, likes: 33 },
                { image: "", name: "Когда ты рядом", artist: "Guf", durationSeconds: 180, comments: 40, likes: 47 },
            ]
        },
        {
            artistId: 2,
            name: "OG Masha",
            image: "path/to/image2.jpg",
            auditionsPerMonth: 12345,
            subscribers: 100,

            tracks: [
                { image: "", name: "Тот самый момент", artist: "Григорий Лепс", durationSeconds: 210, comments: 12, likes: 40 },
                { image: "", name: "Скажи мне правду", artist: "L'One & Мот", durationSeconds: 220, comments: 35, likes: 18 },
                { image: "", name: "Море внутри", artist: "Рыбин", durationSeconds: 240, comments: 45, likes: 23 },
                { image: "", name: "В небе любовь", artist: "Кино", durationSeconds: 200, comments: 30, likes: 33 },
                { image: "", name: "Когда ты рядом", artist: "Guf", durationSeconds: 180, comments: 40, likes: 47 },
            ]
        },
        {
            name: "OG Danchiks",
            auditionsPerMonth: 12345,
            subscribers: 100,

            tracks: [
                { image: "", name: "Тот самый момент", artist: "Григорий Лепс", durationSeconds: 210, comments: 12, likes: 40 },
                { image: "", name: "Скажи мне правду", artist: "L'One & Мот", durationSeconds: 220, comments: 35, likes: 18 },
                { image: "", name: "Море внутри", artist: "Рыбин", durationSeconds: 240, comments: 45, likes: 23 },
                { image: "", name: "В небе любовь", artist: "Кино", durationSeconds: 200, comments: 30, likes: 33 },
                { image: "", name: "Когда ты рядом", artist: "Guf", durationSeconds: 180, comments: 40, likes: 47 },
            ]
        },
        {
            name: "OG Oskana",
            auditionsPerMonth: 12345,
            subscribers: 100,

            tracks: [
                { image: "", name: "Тот самый момент", artist: "Григорий Лепс", durationSeconds: 210, comments: 12, likes: 40 },
                { image: "", name: "Скажи мне правду", artist: "L'One & Мот", durationSeconds: 220, comments: 35, likes: 18 },
                { image: "", name: "Море внутри", artist: "Рыбин", durationSeconds: 240, comments: 45, likes: 23 },
                { image: "", name: "В небе любовь", artist: "Кино", durationSeconds: 200, comments: 30, likes: 33 },
                { image: "", name: "Когда ты рядом", artist: "Guf", durationSeconds: 180, comments: 40, likes: 47 },
            ]
        },
        {
            name: "OG Naida",
            auditionsPerMonth: 12345,
            subscribers: 100,

            tracks: [
                { image: "", name: "Тот самый момент", artist: "Григорий Лепс", durationSeconds: 210, comments: 12, likes: 40 },
                { image: "", name: "Скажи мне правду", artist: "L'One & Мот", durationSeconds: 220, comments: 35, likes: 18 },
                { image: "", name: "Море внутри", artist: "Рыбин", durationSeconds: 240, comments: 45, likes: 23 },
                { image: "", name: "В небе любовь", artist: "Кино", durationSeconds: 200, comments: 30, likes: 33 },
                { image: "", name: "Когда ты рядом", artist: "Guf", durationSeconds: 180, comments: 40, likes: 47 },
            ]
        },
        {
            name: "OG Leksa",
            auditionsPerMonth: 12345,
            subscribers: 100,

            tracks: [
                { image: "", name: "Тот самый момент", artist: "Григорий Лепс", durationSeconds: 210, comments: 12, likes: 40 },
                { image: "", name: "Скажи мне правду", artist: "L'One & Мот", durationSeconds: 220, comments: 35, likes: 18 },
                { image: "", name: "Море внутри", artist: "Рыбин", durationSeconds: 240, comments: 45, likes: 23 },
                { image: "", name: "В небе любовь", artist: "Кино", durationSeconds: 200, comments: 30, likes: 33 },
                { image: "", name: "Когда ты рядом", artist: "Guf", durationSeconds: 180, comments: 40, likes: 47 },
            ]
        },
        {
            name: "OG Denis",
            auditionsPerMonth: 12345,
            subscribers: 100,

            tracks: [
                { image: "", name: "Тот самый момент", artist: "Григорий Лепс", durationSeconds: 210, comments: 12, likes: 40 },
                { image: "", name: "Скажи мне правду", artist: "L'One & Мот", durationSeconds: 220, comments: 35, likes: 18 },
                { image: "", name: "Море внутри", artist: "Рыбин", durationSeconds: 240, comments: 45, likes: 23 },
                { image: "", name: "В небе любовь", artist: "Кино", durationSeconds: 200, comments: 30, likes: 33 },
                { image: "", name: "Когда ты рядом", artist: "Guf", durationSeconds: 180, comments: 40, likes: 47 },
            ]
        }
    ]

    constructor() {
        makeAutoObservable(this);
    }

    getArtistById(id) {
        console.log(id);
        const foundArtist = this.artists.find(artist => artist.artistId === parseInt(id));
        console.log(foundArtist)
        return foundArtist
    }

    getPopularArtists() {
        console.log(this.artists)
        return this.artists;
    }

    // Получить треки артиста
    async getArtistTracks({ page, size, query }, guid) {
        const payload = { page: page, size: size, query: query };
        try {
            const response = await axios.post(`http://localhost:8080/api/sounds/artist/${guid}`, payload, getConfig());
            checkResponse(response)

            return response.data.data;
        } catch (error) {
            getErrors(error);
        }
    }
}

export const artistsStore = new ArtistsStore();
