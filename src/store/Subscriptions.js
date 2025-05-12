import { makeAutoObservable } from "mobx";
import artist1 from '../assets/svg/mocks/artist1.png';
import artist2 from '../assets/svg/mocks/artist2.png';
import artist3 from '../assets/svg/mocks/artist3.png';
import artist4 from '../assets/svg/mocks/artist4.png';
import artist5 from '../assets/svg/mocks/artist5.png';
import artist6 from '../assets/svg/mocks/artist6.png';

class SubscriptionsStore {
    subscriptions = [
        {
            artistId: 1,
            name: "Shadow Beats",
            image: artist1
        },
        {
            artistId: 2,
            name: "Luna Wave",
            image: artist2
        },
        {
            artistId: 2,
            name: "Vortex King",
            image: artist3
        },
        {
            artistId: 2,
            name: "Echo Mirage",
            image: artist4
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
