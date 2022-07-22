import React from 'react';
import styles from './order-feed-item.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function OrderFeedItem() {
    return (
        <div className={`${styles.container} p-6`}>
            <div className={`${styles.topContainer} mb-6`}>
                <span className={`text_type_digits-default `}>#034535</span>
                <span className={`text_type_main-default text_color_inactive ${styles.date}`}>Сегодня, 16:20 i-GMT+3</span>
            </div>
            <h3 className={`text_type_main-medium mb-6`}>Death Star Starship Main бургер</h3>
            <div className={`${styles.bottomContainer}`}>
                <div className={`${styles.icons}`}>
                    <div style={{backgroundImage: "https://code.s3.yandex.net/react/code/bun-02-mobile.png"}} className={styles.icon}></div>
                </div>
                <div className={`ml-6 ${styles.price}`}>
                    <span className="text_type_digits-default mr-2">408</span>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>

        </div>
    );
}

export default OrderFeedItem;