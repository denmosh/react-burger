import { createReducer } from '@reduxjs/toolkit'
import {createOrderRequest, createOrderFailed, createOrderSuccess} from "../actions/order-details";


const orderDetailsInitialState = {
    order:{},
    orderRequest: false,
    orderFailed: false
}

export const orderDetails = createReducer(orderDetailsInitialState, (builder) => {
    builder
        .addCase(createOrderRequest, (state, action) => {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            }
        })
        .addCase(createOrderSuccess, (state, action) => {
            return {
                ...state,
                order: action.payload.order,
                orderRequest: false,
            }
        })
        .addCase(createOrderFailed, (state, action) => {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
            }
        }).addDefaultCase((state, action) => {
        return state
    })
});