import React, {useState, useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {IngredientsContext} from "../../services/ingredients-context";
import appStyles from './app.module.css';
import {API_URL} from "../../constants/constants";


function App(){

    const[state, setState] = useState({
        loading: true,
        hasError: false,
        activeTab: "bun",
        categories: {
            bun: "Булки",
            sauce: "Начинки",
            main: "Соусы",
        }
    });
    const[ingredients, setIngredients] = useState([]);

    const getIngredients = () => {
        fetch(API_URL + "api/ingredients")
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((res) => {
                setState({
                    ...state,
                    loading: false,
                    hasError: false,
                });
                setIngredients(res.data);

            }).catch((error)=>{
                setState({
                    ...state,
                    loading: false,
                    hasError: true,
                });
                setIngredients([]);
                console.log(error);
            });
    }

    useEffect(()=>{
        getIngredients();
    }, [])

    return (
        <>
            <AppHeader/>
            <div className={appStyles.wrapper}>
                <section className={appStyles.main}>
                    {state.hasError ? (
                        <p>При получении данных воникла ошибка, пожалуйста, обратитесь к администратору.</p>
                    ) : (
                        <IngredientsContext.Provider value={{ingredients, setIngredients}}>
                            <BurgerIngredients categories={state.categories}/>
                            <BurgerConstructor/>
                        </IngredientsContext.Provider>
                    )}

                </section>
            </div>
        </>
    );
}

export default App;
