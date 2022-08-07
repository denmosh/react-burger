import { createReducer } from '@reduxjs/toolkit'
import {IOrderItem} from "../interfaces/interfaces";
import {clearOrder, setOrder} from "../actions/current-order";


interface ICurrentOrder {
    order: IOrderItem|null
}
const currentOrderInitialState:ICurrentOrder = {
    order: null,
}

export const currentOrder = createReducer(currentOrderInitialState, (builder) => {
    builder
        .addCase(setOrder, (state, action) => {
            return {order: action.payload}
        })
        .addCase(clearOrder, (state, action) => {
            return {order: null}
        })
});