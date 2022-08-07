import React, {useEffect} from 'react';
import styles from "./profile.module.css";
import stylesOrders from "./orders.module.css";
import ProfileMenu from "../components/profile-menu/profile-menu";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {wsInit} from "../services/actions/ws-actions";
import OrderItem from "../components/order-item/order-item";

function OrdersPage() {
    const dispatch = useAppDispatch();
    const {orders} = useAppSelector(store => store.wsReducer)

    useEffect(()=> {
        dispatch(wsInit({path: "orders"}))
    }, [])
    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container}`}>
                <ProfileMenu/>
                <section className={`mt-15 ${stylesOrders.container}`}>
                    {orders.map((order) => {
                            return(
                                <OrderItem displayStatus={true}  key={order.number} order={order}/>
                            )
                        }
                    )}
                </section>
            </div>
        </div>
    );
}

export default OrdersPage;