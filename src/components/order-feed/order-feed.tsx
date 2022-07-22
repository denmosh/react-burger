import React from 'react';
import OrderFeedItem from "../order-feed-item/order-feed-item";
import styles from './order-feed.module.css';

function OrderFeed() {
    return (
        <div className={styles.container}>
            <OrderFeedItem/>
        </div>
    );
}

export default OrderFeed;