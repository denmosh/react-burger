import React from 'react';
import styles from './order-item-details.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function OrderItemDetails() {
    return (
        <div className={`pt-10 ${styles.wrapper}`}>
            <p className={`text_type_digits-default ${styles.textCenter}`}>#034533</p>
            <h3 className={`mt-10 text_type_main-medium`}>Black Hole Singularity острый бургер</h3>
            <p className={`mt-3 text_type_main-default text_color_success`}></p>
            <p className={`mt-15 mb-6 text_type_main-medium`}>Состав:</p>
            <div className={styles.ingredients}>
                <div className={`mb-4 ${styles.ingredient}`}>
                    <div className={styles.iconWrapper} style={{backgroundImage: `url("https://code.s3.yandex.net/react/code/bun-02-mobile.png")`}} >
                        <div className={styles.icon}></div>
                    </div>
                    <p className={`ml-4 text_type_main-medium ${styles.name}`}>Флюоресцентная булка R2-D3</p>
                    <div className={`ml-4 ${styles.price}`}>
                        <span className="text_type_digits-default mr-2">2 x 20</span>
                        <CurrencyIcon type={"primary"}/>
                    </div>
                </div>
                <div className={`${styles.bottomWrapper} mt-10`}>
                    <p className={`text_type_main-default text_color_inactive ${styles.date} ${styles.textLeft}`}>Сегодня, 16:20 i-GMT+3</p>
                    <div className={`ml-6 ${styles.price}`}>
                        <span className="text_type_digits-default mr-2">408</span>
                        <CurrencyIcon type={"primary"}/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default OrderItemDetails;