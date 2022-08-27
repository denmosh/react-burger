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
    order: null,
    orderRequest: false,
    orderFailed: false,
    orderModal: false,
    total: 0,
}


export const orderDetails = createReducer(orderDetailsInitialState, (builder) => {
    builder
        .addCase(createOrderRequest, (state) => {
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
        .addCase(showOrderModal, (state) => {
            return {
                ...state,
                orderModal: true,
            }
        })
        .addCase(closeOderModal, (state) => {
            return {
                ...state,
                orderModal: false,
            }
        })
        .addCase(createOrderFailed, (state) => {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
            }
        }).addDefaultCase((state) => {
        return state
    })
});