import { createReducer } from '@reduxjs/toolkit'
import {
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionSuccess,
    wsGetMessage,
    wsSendMessage
} from "../actions/ws-actions";
import {IOrderItem, IWsMessage} from '../interfaces/interfaces';

interface IInitialState extends IWsMessage{
    wsConnected: boolean
}
const initialState:IInitialState = {
    wsConnected: false,
    orders: [],
    total: -1,
    totalToday: -1
};


export const wsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnectionSuccess, (state, action) => {
            return {
                ...state,
                wsConnected: true
            };
        })
        .addCase(wsConnectionError, (state, action) => {
            return {
                ...state,
                wsConnected: false
            };
        })
        .addCase(wsConnectionClosed, (state, action) => {
            return {
                ...state,
                wsConnected: false
            };
        })
        .addCase(wsGetMessage, (state, action) => {
            return {
                ...state,
                ...action.payload
                // messages: state.messages.length
                //     ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
                //     : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
            };
        })

});