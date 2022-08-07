import {createAction} from "@reduxjs/toolkit";
import {IOrderItem, IOrderResponse} from "../interfaces/interfaces";
import {getOrderReq} from "../api";
import {getResponse} from "./common";

export const setOrder = createAction<IOrderItem>('SET_ORDER');
export const clearOrder = createAction('CLEAR_ORDER');

export const getOrderRequest = createAction('GET_ORDER_REQUEST');
export const getOrderSuccess = createAction<IOrderResponse>('GET_ORDER_SUCCESS');
export const getOrderFailed = createAction('GET_ORDER_FAILED');


export function getOrder(id: string) {

    return function (dispatch:any) {

        dispatch(getOrderRequest());
        getOrderReq(id)
            .then(getResponse)
            .then((res) => {
                dispatch(getOrderSuccess(res));
            }).catch((error) => {
                dispatch(getOrderFailed());
         });
    }
}