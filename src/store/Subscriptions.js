import { makeAutoObservable } from "mobx";

class SubscriptionsStore {
    subscriptions = [
        {
            artistId: 1,
            name: "OG Pashka 1",
            image: "e"
        },
        {
            artistId: 2,
            name: "OG Pashka 2",
            image: "e"
        },
        {
            artistId: 2,
            name: "OG Pashka 3",
            image: "e"
        },
        {
            artistId: 2,
            name: "OG Pashka 3",
            image: "e"
        },
        {
            artistId: 2,
            name: "OG Pashka 3",
            image: "e"
        },
        {
            artistId: 2,
            name: "OG Pashka 3",
            image: "e"
        },
        {
            artistId: 2,
            name: "OG Pashka 3",
            image: "e"
        }
    ]

    constructor() {
        makeAutoObservable(this); // Делаем свойства реактивными
    }

    getArtistById(id) {
        console.log(id);
        const foundArtist = this.artists.find(artist => artist.artistId === parseInt(id));
        console.log(foundArtist)
        return foundArtist
    }
}

export const subscriptionsStore = new SubscriptionsStore(); // Экспортируем экземпляр
