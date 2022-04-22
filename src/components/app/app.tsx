import React from 'react';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import appStyles from './app.module.css';


function App() {
  return (
    <>
        <AppHeader/>
        <div className={appStyles.wrapper}>
            <section className={appStyles.main}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </section>
        </div>
    </>
  );
}

export default App;
