import { createReducer } from '@reduxjs/toolkit'
import {
    createOrderRequest,
    createOrderFailed,
    createOrderSuccess,
    countOrderTotal,
    showOrderModal, closeOderModal
} from "../actions/order-details";

interface IOrderDetails {
    order:null|{
        number: number
    },
    orderRequest: boolean,
    orderFailed: boolean,
    orderModal: boolean,
    total: number,
}
const orderDetailsInitialState:IOrderDetails = {
    order:null,
    orderRequest: false,
    orderFailed: false,
    orderModal: false,
    total: 0,
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
        .addCase(countOrderTotal, (state, action) => {
            const sum = action.payload.reduce((accumulator, item) => {
                return accumulator + item.price;
            }, 0);
            return {
                ...state,
                total: sum,
            }
        })
        .addCase(showOrderModal, (state, action) => {
            return {
                ...state,
                orderModal: true,
            }
        })
        .addCase(closeOderModal, (state, action) => {
            return {
                ...state,
                orderModal: false,
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