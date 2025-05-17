import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import './Subscriptions.css';
import Header from "../components/layout/Header"; // Create this CSS file for styling
import { authStore } from '../store/Auth';
import Subscription from "../components/Subscription";
import { subscriptionsStore } from "../store/Subscriptions";
import Track from "../components/Track";

const Subscriptions = () => {
  return (
    <div className="page-container">
        <Header>SoundCloud Demo</Header>
      <div className="page-content">
          {authStore.isAuth && <Sidebar />}
          <section>
              <h2>Подписки</h2>
              <div className="track-list track-list--long">
                  {subscriptionsStore.subscriptions.map((subscription, index) => (
                      <Subscription key={index} subscription={subscription} index={subscription}/>
                  ))}
              </div>
          </section>
      </div>
    </div>
  );
};

export default Subscriptions; 