import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Favorites from './pages/Favorites';
import Subscriptions from './pages/Subscriptions';
import ArtistPage from './pages/ArtistPage';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import Layout from './layout/Layout';
import SidebarLayout from './layout/SidebarLayout';

import './App.css';
import Player from "./components/player/Player";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route element={<Layout />}>
              <Route element={<SidebarLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/artist/:id" element={<ArtistPage />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </div>
        <Player></Player>
      </div>
    </BrowserRouter>
  );
}

export default App;
