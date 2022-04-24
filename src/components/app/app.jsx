import React, {useState, useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import {API_URL} from "../../constants/constants";


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

    const getIngredients = () => {
        fetch(API_URL + "api/ingredients")
            .then((res) => res.json())
            .then((res) => {
                setState({
                    ...state,
                    loading: false,
                    hasError: false,
                    ingredients: res.data,
                })
            }).catch((error)=>{
                setState({
                    ...state,
                    loading: false,
                    hasError: true,
                    ingredients: [],
                })
                console.log(error)
            });
    }

    useEffect(()=>{
        getIngredients()
    }, [])

    return (
        <>
            <AppHeader/>
            <div className={appStyles.wrapper}>
                <section className={appStyles.main}>
                    {state.hasError? (
                        <p>При получении данных воникла ошибка, пожалуйста, обратитесь к администратору.</p>
                    ) : (
                        <>
                            <BurgerIngredients ingredients={state.ingredients} categories={state.categories}/>
                            <BurgerConstructor ingredients={state.ingredients}/>
                        </>
                    )}

                </section>
            </div>
        </>
    );
}

export default App;
