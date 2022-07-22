import React from 'react';
import appStyles from "../components/app/app.module.css";
import OrderFeed from "../components/order-feed/order-feed";
import OrderDashboard from "../components/order-dashboard/order-dashboard";

function FeedPage() {
    return (
        <div className={appStyles.wrapper}>
            <h1 className={"text_type_main-large mt-10 mb-5"}>Лента заказов</h1>
            <section className={appStyles.main}>
                <OrderFeed/>
                <OrderDashboard/>
            </section>
        </div>
    );
}

export default FeedPage;