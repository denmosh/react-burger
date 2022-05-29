import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import {store} from "../../services/store";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NotFound404, HomePage } from "../../pages";

function App(){

    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <AppHeader/>
                <Router>
                    <Switch>
                        <Route path="/" exact={true}>
                            <HomePage/>
                        </Route>
                        <Route>
                            <NotFound404 />
                        </Route>
                    </Switch>
                </Router>

            </DndProvider>
        </Provider>
    );
}

export default App;
