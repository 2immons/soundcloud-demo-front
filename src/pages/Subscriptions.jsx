import React from 'react';
import './Subscriptions.css';

import Subscription from "../components/Subscription";
import { subscriptionsStore } from "../store/Subscriptions";

const Subscriptions = () => {
  return (
    <section>
        <h2>Подписки</h2>
        <div className="track-list track-list--long">
            {subscriptionsStore.subscriptions.map((subscription, index) => (
                <Subscription key={index} subscription={subscription} index={subscription}/>
            ))}
        </div>
    </section>
  );
};

export default Subscriptions; 