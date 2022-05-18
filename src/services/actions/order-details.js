import {createAction} from "@reduxjs/toolkit";
import {API_URL} from "../../constants/constants";
import {getResponse} from "./common";
import {clearIngredients} from "./burger-constructor";

export const createOrderRequest = createAction('CREATE_ORDER_REQUEST');
export const createOrderSuccess = createAction('CREATE_ORDER_SUCCESS');
export const createOrderFailed = createAction('CREATE_ORDER_FAILED');

export function createOrder(ingredients) {

    return function (dispatch) {

        dispatch(createOrderRequest());

        fetch(API_URL + "api/orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: ingredients})
        })
            .then(getResponse)
            .then((res) => {
                dispatch(createOrderSuccess(res));
                dispatch(clearIngredients());
            }).catch((error) => {
            dispatch(createOrderFailed());
        });
    }
}