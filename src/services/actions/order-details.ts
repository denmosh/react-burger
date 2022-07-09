import {createAction} from "@reduxjs/toolkit";
import {getResponse} from "./common";
import {clearIngredients} from "./burger-constructor";
import {createOrderReq} from "../api";
import {handleError} from "./user";
import {IIngredient, IOrderResponse} from "../interfaces/interfaces";

export const createOrderRequest = createAction('CREATE_ORDER_REQUEST');
export const createOrderSuccess = createAction<IOrderResponse>('CREATE_ORDER_SUCCESS');
export const createOrderFailed = createAction('CREATE_ORDER_FAILED');
export const countOrderTotal = createAction<IIngredient[]>('COUNT_ORDER_TOTAL');
export const showOrderModal = createAction('SHOW_ORDER_MODAL');
export const closeOderModal = createAction('CLOSE_ORDER_MODAL');

export function createOrder(ingredients:string[]) {

    return function (dispatch:any) {

        dispatch(createOrderRequest());

        createOrderReq({ingredients: ingredients})
            .then(getResponse)
            .then((res) => {
                dispatch(createOrderSuccess(res));
                dispatch(clearIngredients());
                dispatch(showOrderModal());
            }).catch((error) => {
                handleError(dispatch, error, createOrder, ingredients);
                dispatch(createOrderFailed());
        });
    }
}