import {createAction} from "@reduxjs/toolkit";

export const wsInit = createAction('WS_INIT');
export const wsConnectionSuccess = createAction('WS_CONNECTION_SUCCESS');
export const wsConnectionError = createAction('WS_CONNECTION_ERROR');
export const wsConnectionClosed = createAction('WS_CONNECTION_CLOSED');
export const wsGetMessage = createAction<object>('WS_GET_MESSAGE');
export const wsSendMessage = createAction('WS_SEND_MESSAGE');
