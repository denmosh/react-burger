import React, {useState, useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import {ingredients} from "../../utils/data";


function App(){

    const[state, setState] = useState({
        ingredients: [],
        loading: true,
        hasError: false,
        activeTab: "bun",
        categories: {
            bun: "Булки",
            sauce: "Начинки",
            main: "Соусы",
        }
    });
    useEffect(()=>{
        setState({
            ...state,
            loading: false,
            hasError: false,
            ingredients: ingredients,
        })
    }, [state])
    return (
        <>
            <AppHeader/>
            <div className={appStyles.wrapper}>
                <section className={appStyles.main}>
                    <BurgerIngredients ingredients={state.ingredients} categories={state.categories}/>
                    <BurgerConstructor ingredients={state.ingredients}/>
                </section>
            </div>
        </>
    );
}

export default App;
