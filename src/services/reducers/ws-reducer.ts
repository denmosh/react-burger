import { createReducer } from '@reduxjs/toolkit'
import {
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionSuccess,
    wsGetMessage,
    wsSendMessage
} from "../actions/ws-actions";

interface IInitialState {
    wsConnected: boolean,
    messages: Array<Object>
}
const initialState:IInitialState = {
    wsConnected: false,
    messages: []
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
                messages: state.messages.length
                    ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
                    : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
            };
        })

});