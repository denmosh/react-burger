import { createReducer } from '@reduxjs/toolkit'
import {IOrderItem} from "../interfaces/interfaces";
import {clearOrder, getOrderFailed, getOrderRequest, getOrderSuccess, setOrder} from "../actions/current-order";


interface ICurrentOrder {
    order: IOrderItem|null,
    orderRequest: boolean,
    orderFailed: boolean,
}
const currentOrderInitialState:ICurrentOrder = {
    order: null,
    orderRequest: false,
    orderFailed: false,
}

export const currentOrder = createReducer(currentOrderInitialState, (builder) => {
    builder
        .addCase(setOrder, (state, action) => {
            return {
                ...state,
                order: action.payload
            }
        })
        .addCase(clearOrder, (state, action) => {
            return {
                ...state,
                order: null
            }
        })
        .addCase(getOrderRequest, (state, action) => {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            }
        })
        .addCase(getOrderSuccess, (state, action) => {
            return {
                ...state,
                order: action.payload,
                orderRequest: false,
            }
        })
        .addCase(getOrderFailed, (state, action) => {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
            }
        })
});