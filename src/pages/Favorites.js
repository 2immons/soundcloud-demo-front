import Track from "../components/Track";
import { tracksStore } from "../store/Tracks";
import './Favorites.css';

const Favorites = () => (
    <section>
        <h2>Избранные треки</h2>
        <div className="track-list">
            {tracksStore.tracks.map((track, index) => (
                <Track key={index} track={track} index={index} />
            ))}
        </div>
    </section>
);

export default Favorites;
