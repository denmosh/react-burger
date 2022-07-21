import React from 'react';
import styles from  "./order-dashboard.module.css";

function OrderDashboard() {
    return (
        <div className={`mr-15`}>
            <div className={`${styles.numberContainer} mb-15`}>
                <div className={`${styles.numberCol}`}>
                    <h3 className={`text_type_main-medium mb-6`}>Готовы:</h3>
                    <ul>
                        <li className={`text_color_success text_type_digits-default mb-2`}>034533</li>
                        <li className={`text_color_success text_type_digits-default mb-2`}>034534</li>
                    </ul>
                </div>
                <div className={`${styles.numberCol}`}>
                    <h3 className={`text_type_main-medium mb-6`}>В работе:</h3>
                    <ul>
                        <li className={`text_color_primary text_type_digits-default mb-2`}>034533</li>
                        <li className={`text_color_primary text_type_digits-default mb-2`}>034534</li>
                    </ul>
                </div>
            </div>
            <div className={`mb-15`}>
                <h3 className={`text_type_main-medium mb-6`}>Выполнено за все время:</h3>
                <span className={`${styles.totalNumber} text_type_digits-large`}>28 752</span>
            </div>
            <div className={`mb-15`}>
                <h3 className={`text_type_main-medium mb-6`}>Выполнено за сегодня:</h3>
                <span className={`${styles.totalNumber} text_type_digits-large`}>138</span>
            </div>


        </div>
    );
}

export default OrderDashboard;