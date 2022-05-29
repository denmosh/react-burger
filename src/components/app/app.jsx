import React from 'react';
import AppHeader from "../app-header/app-header";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import {store} from "../../services/store";
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import {
    NotFound404,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage, IngredientPage
} from "../../pages";

function App(){

    return (
        <Router>
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <AppHeader/>
                <Switch>
                    <Route path="/" exact={true}>
                        <HomePage/>
                    </Route>
                    <Route path="/login" exact={true}>
                        <LoginPage/>
                    </Route>
                    <Route path="/register" exact={true}>
                        <RegisterPage/>
                    </Route>
                    <Route path="/forgot-password" exact={true}>
                        <ForgotPasswordPage/>
                    </Route>
                    <Route path="/reset-password" exact={true}>
                        <ResetPasswordPage/>
                    </Route>
                    <Route path="/profile" exact={true}>
                        <ProfilePage/>
                    </Route>
                    <Route path="/ingredients/:id" exact={true}>
                        <IngredientPage/>
                    </Route>
                    <Route>
                        <NotFound404 />
                    </Route>
                </Switch>
            </DndProvider>
        </Provider>
        </Router>

    );
}

export default App;
