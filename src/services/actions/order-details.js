import {createAction} from "@reduxjs/toolkit";
import {API_URL} from "../../constants/constants";

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
            .then(res => {
                if (res.ok || res.status === 400) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((res) => {
                dispatch(createOrderSuccess(res));
            }).catch((error) => {
            dispatch(createOrderFailed());
        });
    }
}