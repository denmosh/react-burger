import {createAction} from "@reduxjs/toolkit";
import {API_URL} from "../../constants/constants";

export const getIngredients = createAction('GET_INGREDIENTS')
export const getIngredientsSuccess = createAction('GET_INGREDIENTS_SUCCESS')
export const getIngredientsFailed = createAction('GET_INGREDIENTS_FAILED')

export function getBurgerIngredients() {

    return function (dispatch) {

        dispatch(getIngredients());

        fetch(API_URL + "api/ingredients").then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        }).then((res) => {
            dispatch(getIngredientsSuccess(res.data));
        }).catch((error) => {
            dispatch(getIngredientsFailed(error));
        });
    }
}