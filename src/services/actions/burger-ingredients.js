import {createAction} from "@reduxjs/toolkit";
import {API_URL} from "../../constants/constants";
import {getResponse} from "./common";

export const getIngredients = createAction('GET_INGREDIENTS');
export const getIngredientsSuccess = createAction('GET_INGREDIENTS_SUCCESS');
export const getIngredientsFailed = createAction('GET_INGREDIENTS_FAILED');
export const updateActiveTab = createAction('UPDATE_ACTIVE_TAB');

export function getBurgerIngredients() {

    return function (dispatch) {

        dispatch(getIngredients());

        fetch(API_URL + "api/ingredients").then(res => {
            getResponse(res);
        }).then((res) => {
            dispatch(getIngredientsSuccess(res.data));
        }).catch((error) => {
            dispatch(getIngredientsFailed(error));
        });
    }
}
