import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // We'll create this CSS file for styling
import exitIcon from '../../assets/svg/exit-btn.svg';
import { authStore } from '../../store/Auth';

const Sidebar = () => {
    const signOut = () => {
        authStore.signOut().then(() => window.location.reload());
    }
    return (
      <div className="sidebar-wrapper">
          <div className="sidebar">
              <nav>

                  <Link to="/">Главная</Link>
                  <Link to="/profile">Аккаунт</Link>


                  <Link to="/favorites">Избранные</Link>


                  <Link to="/subscriptions">Подписки</Link>

              </nav>
              <button className="logout-button" onClick={signOut}>
                  <img src={exitIcon} alt="exit_icon" />
                  Выйти
              </button>
          </div>
      </div>
  );
};

export default Sidebar;