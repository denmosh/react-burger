import React from 'react';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import appStyles from './app.module.css';


function App() {
  return (
    <div className={`${appStyles.app}`}>
        <AppHeader/>
        <div className={appStyles.main}>
            <h1 className={"text_type_main-large"}>Соберите бургер</h1>
            <section className={appStyles.wrapper}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </section>

        </div>
    </div>
  );
}

export default App;
