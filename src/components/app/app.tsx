import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import { Route, Switch, useHistory, useLocation} from "react-router-dom";
import { Location } from "history";
import Modal from '../modal/modal';
import {
    NotFound404,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    IngredientPage
} from "../../pages";
import {ProtectedRoute} from "../protected-route/protected-route";
import {clearIngredient} from "../../services/actions/current-ingredient";
import {getBurgerIngredients} from "../../services/actions/burger-ingredients";
import {useAppDispatch} from "../../hooks/hooks";


interface ILocationState {
    background?: Location|undefined
}
function App(){
    const history = useHistory();
    const location = useLocation<ILocationState>();
    const dispatch = useAppDispatch();
    const background = location.state && location.state.background;

    useEffect(()=>{
        dispatch(getBurgerIngredients());
    },[])

    const onClose = () => {

        dispatch(clearIngredient());
        history.goBack();
    };
    return (
            <>
                <AppHeader/>
                <Switch location={background || location}>
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
                    <ProtectedRoute path="/profile" exact={true}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders" exact={true}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <Route path="/ingredients/:id" exact={true}>
                        <IngredientPage/>
                    </Route>
                    <Route>
                        <NotFound404 />
                    </Route>
                </Switch>

                {background && (
                    <Route path="/ingredients/:id" exact={true}>
                        <Modal onClose={onClose} title={"???????????? ??????????????????????"}>
                            <IngredientPage/>
                        </Modal>
                    </Route>
                )}
        </>
    );
}

export default App;
