import {createAction} from "@reduxjs/toolkit";
import {API_URL} from "../../constants/constants";
import {getResponse} from "./common";
import {IError, IIngredient} from "../interfaces/interfaces";
import {AppDispatch} from "../store";

export const getIngredients = createAction('GET_INGREDIENTS');
export const getIngredientsSuccess = createAction<IIngredient[]>('GET_INGREDIENTS_SUCCESS');
export const getIngredientsFailed = createAction<IError>('GET_INGREDIENTS_FAILED');
export const updateActiveTab = createAction<string>('UPDATE_ACTIVE_TAB');

export function getBurgerIngredients() {

    return function (dispatch:AppDispatch) {

        dispatch(getIngredients());

        fetch(API_URL + "api/ingredients").then(getResponse).then((res) => {
            dispatch(getIngredientsSuccess(res.data));
        }).catch((error) => {
            dispatch(getIngredientsFailed(error));
        });
    }
}
