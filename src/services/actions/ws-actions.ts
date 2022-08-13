import {createAction} from "@reduxjs/toolkit";
import {IWsInit, IWsMessage} from "../interfaces/interfaces";

export const wsInit = createAction<IWsInit>('WS_INIT');
export const wsClose = createAction('WS_CLOSE');
export const wsConnectionSuccess = createAction('WS_CONNECTION_SUCCESS');
export const wsConnectionError = createAction('WS_CONNECTION_ERROR');
export const wsConnectionClosed = createAction('WS_CONNECTION_CLOSED');
export const wsGetMessage = createAction<IWsMessage>('WS_GET_MESSAGE');
export const wsSendMessage = createAction('WS_SEND_MESSAGE');
