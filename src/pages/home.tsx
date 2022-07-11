import React from 'react';

import appStyles from "../components/app/app.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";


export function HomePage() {
    return (
        <div className={appStyles.wrapper}>
            <section className={appStyles.main}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </section>
        </div>
    );
}