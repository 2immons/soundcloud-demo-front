import { makeAutoObservable } from "mobx";
import {checkResponse, getConfig, getErrors} from "../utils/utils";
import axios from "axios";
import artist1 from '../assets/svg/mocks/artist1.png';
import artist2 from '../assets/svg/mocks/artist2.png';
import artist3 from '../assets/svg/mocks/artist3.png';
import artist4 from '../assets/svg/mocks/artist4.png';
import artist5 from '../assets/svg/mocks/artist5.png';
import artist6 from '../assets/svg/mocks/artist6.png';

class ArtistsStore {
    artists = [
        {
            artistId: 1,
            name: "Shadow Beats",
            image: artist1,
            auditionsPerMonth: 15600,
            subscribers: 250,
            tracks: [
                { image: "", name: "Midnight Echo", artist: "Shadow Beats", seconds: 195, comments: 28, likes: 75 },
                { image: "", name: "Phantom Groove", artist: "Shadow Beats", seconds: 210, comments: 42, likes: 91 },
                { image: "", name: "Lost in the Static", artist: "Shadow Beats", seconds: 225, comments: 35, likes: 64 },
                { image: "", name: "Neon Dreams", artist: "Shadow Beats", seconds: 180, comments: 50, likes: 83 },
                { image: "", name: "Silent Storm", artist: "Shadow Beats", seconds: 200, comments: 31, likes: 57 }
            ]
        },
        {
            artistId: 2,
            name: "Luna Wave",
            image: artist2,
            auditionsPerMonth: 13400,
            subscribers: 180,
            tracks: [
            { image: "", name: "Ocean of Stars", artist: "Luna Wave", seconds: 220, comments: 45, likes: 88 },
            { image: "", name: "Moonlit Serenade", artist: "Luna Wave", seconds: 205, comments: 38, likes: 72 },
            { image: "", name: "Celestial Dance", artist: "Luna Wave", seconds: 230, comments: 52, likes: 95 },
            { image: "", name: "Starlight Lullaby", artist: "Luna Wave", seconds: 190, comments: 41, likes: 67 },
            { image: "", name: "Cosmic Whispers", artist: "Luna Wave", seconds: 215, comments: 36, likes: 79 }
        ]
        },
        {
            name: "Vortex King",
            image: artist3,
            auditionsPerMonth: 17800,
            subscribers: 320,
            tracks: [
            { image: "", name: "Cybernetic Pulse", artist: "Vortex King", seconds: 240, comments: 60, likes: 110 },
            { image: "", name: "Digital Mirage", artist: "Vortex King", seconds: 195, comments: 47, likes: 85 },
            { image: "", name: "Neon Overload", artist: "Vortex King", seconds: 210, comments: 53, likes: 97 },
            { image: "", name: "Quantum Shift", artist: "Vortex King", seconds: 225, comments: 58, likes: 104 },
            { image: "", name: "Hologram Heart", artist: "Vortex King", seconds: 200, comments: 49, likes: 92 }
        ]
        },
        {
            name: "Echo Mirage",
            image: artist4,
            auditionsPerMonth: 11200,
            subscribers: 150,
            tracks: [
            { image: "", name: "Fading Memories", artist: "Echo Mirage", seconds: 185, comments: 33, likes: 68 },
            { image: "", name: "Whispering Shadows", artist: "Echo Mirage", seconds: 195, comments: 40, likes: 74 },
            { image: "", name: "Distant Horizons", artist: "Echo Mirage", seconds: 205, comments: 37, likes: 71 },
            { image: "", name: "Silent Reverie", artist: "Echo Mirage", seconds: 190, comments: 42, likes: 80 },
            { image: "", name: "Frozen Echo", artist: "Echo Mirage", seconds: 215, comments: 45, likes: 83 }
        ]
        },
        {
            name: "Neon Ghost",
            image: artist5,
                auditionsPerMonth: 14500,
            subscribers: 210,
            tracks: [
            { image: "", name: "Phantom Lights", artist: "Neon Ghost", seconds: 200, comments: 48, likes: 90 },
            { image: "", name: "Electric Dreams", artist: "Neon Ghost", seconds: 185, comments: 39, likes: 76 },
            { image: "", name: "Midnight Drive", artist: "Neon Ghost", seconds: 220, comments: 55, likes: 102 },
            { image: "", name: "Synthetic Love", artist: "Neon Ghost", seconds: 195, comments: 44, likes: 81 },
            { image: "", name: "Glowing Ashes", artist: "Neon Ghost", seconds: 210, comments: 50, likes: 94 }
        ]
        },
        {
            name: "Solar Flare",
            image: artist6,
                auditionsPerMonth: 16500,
            subscribers: 290,
            tracks: [
            { image: "", name: "Burning Sky", artist: "Solar Flare", seconds: 230, comments: 62, likes: 115 },
            { image: "", name: "Golden Rays", artist: "Solar Flare", seconds: 195, comments: 51, likes: 98 },
            { image: "", name: "Cosmic Fire", artist: "Solar Flare", seconds: 210, comments: 57, likes: 106 },
            { image: "", name: "Stellar Wind", artist: "Solar Flare", seconds: 200, comments: 49, likes: 92 },
            { image: "", name: "Nova Blast", artist: "Solar Flare", seconds: 225, comments: 64, likes: 118 }
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
