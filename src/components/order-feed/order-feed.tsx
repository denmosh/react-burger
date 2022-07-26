import React from 'react';
import OrderItem from "../order-item/order-item";
import styles from './order-feed.module.css';

function OrderFeed() {
    return (
        <div className={styles.container}>
            <OrderItem/>
        </div>
    );
}

export default OrderFeed;