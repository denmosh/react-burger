import {createAction} from "@reduxjs/toolkit";
import {IOrderItem} from "../interfaces/interfaces";
import {getOrderReq} from "../api";
import {getResponse} from "./common";
import {AppDispatch} from "../store";

export const setOrder = createAction<IOrderItem>('SET_ORDER');
export const clearOrder = createAction('CLEAR_ORDER');

export const getOrderRequest = createAction('GET_ORDER_REQUEST');
export const getOrderSuccess = createAction<IOrderItem>('GET_ORDER_SUCCESS');
export const getOrderFailed = createAction('GET_ORDER_FAILED');


export function getOrder(number: string) {

    return function (dispatch:AppDispatch) {

        dispatch(getOrderRequest());
        getOrderReq(number)
            .then(getResponse)
            .then((res) => {
                if(res && res.orders && res.orders[0]){
                    dispatch(getOrderSuccess(res.orders[0]));
                }else{
                    throw new Error("Unable to parse response.")
                }

            }).catch(() => {
                dispatch(getOrderFailed());
         });
    }
}