import React, {useEffect} from 'react';
import OrderItem from "../order-item/order-item";
import styles from './order-feed.module.css';
import {wsClose, wsInit} from "../../services/actions/ws-actions";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

function OrderFeed() {
    const dispatch = useAppDispatch();
    const {orders} = useAppSelector(store => store.wsReducer)

    useEffect(()=> {
        dispatch(wsInit({path: "orders/all"}))
        return () =>{
            dispatch(wsClose());
        }
    }, [])
    return (
        <div className={styles.container}>
            {orders.map((order) => {
                return(
                    <OrderItem key={order.number} order={order}/>
                    )
                }
            )}

        </div>
    );
}

export default OrderFeed;