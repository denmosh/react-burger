import React from 'react';
import styles from "./profile.module.css";
import ProfileMenu from "../components/profile-menu/profile-menu";

function OrdersPage() {
    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container}`}>
                <ProfileMenu/>
                <section>

                </section>
            </div>
        </div>
    );
}

export default OrdersPage;