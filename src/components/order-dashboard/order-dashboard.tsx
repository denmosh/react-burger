import React from 'react';
import styles from  "./order-dashboard.module.css";
import {useAppSelector} from "../../hooks/hooks";

function OrderDashboard() {
    const {total, totalToday, orders} = useAppSelector(store => store.wsReducer)
    const done = orders.filter((order)=>{
        return order.status === 'done';
    })
    const prepared = orders.filter((order)=>{
        return order.status === 'prepared';
    })
    return (
        <div className={`mr-15`}>
            <div className={`${styles.numberContainer} mb-15`}>
                <div className={`${styles.numberCol}`}>
                    <h3 className={`text_type_main-medium mb-6`}>Готовы:</h3>
                    <ul>
                        {done.slice(0, 6).map((order)=>{
                            return(
                                <li className={`text_color_success text_type_digits-default mb-2`}>{order.number}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className={`${styles.numberCol}`}>
                    <h3 className={`text_type_main-medium mb-6`}>В работе:</h3>
                    <ul>
                        {prepared.slice(0, 6).map((order)=>{
                            return(
                                <li className={`text_color_primary text_type_digits-default mb-2`}>{order.number}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className={`mb-15`}>
                <h3 className={`text_type_main-medium mb-6`}>Выполнено за все время:</h3>
                <span className={`${styles.totalNumber} text_type_digits-large`}>{total}</span>
            </div>
            <div className={`mb-15`}>
                <h3 className={`text_type_main-medium mb-6`}>Выполнено за сегодня:</h3>
                <span className={`${styles.totalNumber} text_type_digits-large`}>{totalToday}</span>
            </div>


        </div>
    );
}

export default OrderDashboard;