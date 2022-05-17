import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from "../../services/reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";



const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true,
    enhancers: [],
})

function App(){

    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <AppHeader/>
                <div className={appStyles.wrapper}>
                    <section className={appStyles.main}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </section>
                </div>
            </DndProvider>
        </Provider>
    );
}

export default App;
