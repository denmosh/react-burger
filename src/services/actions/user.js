import {createAction} from "@reduxjs/toolkit";

import {getResponse} from "./common";
import {forgotPasswordReq, getUserReq, loginReq, registerReq, updateUserReq} from "../api";
import {setCookie, setTokenCookie} from "../utils";

export const getUserRequest = createAction('GET_USER_REQUEST');
export const getUserSuccess = createAction('GET_USER_SUCCESS');
export const getUserFailed = createAction('GET_USER_FAILED');

export const updateUserRequest = createAction('UPDATE_USER_REQUEST');
export const updateUserSuccess = createAction('UPDATE_USER_SUCCESS');
export const updateUserFailed = createAction('UPDATE_USER_FAILED');

export const registerRequest = createAction('REGISTER_REQUEST');
export const registerSuccess = createAction('REGISTER_SUCCESS');
export const registerFailed = createAction('REGISTER_FAILED');

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailed = createAction('LOGIN_FAILED');

export const tokenRequest = createAction('TOKEN_REQUEST');
export const tokenSuccess = createAction('TOKEN_SUCCESS');
export const tokenFailed = createAction('TOKEN_FAILED');

export const resetPasswordRequest = createAction('PASSWORD_RESET_REQUEST');
export const resetPasswordSuccess = createAction('PASSWORD_RESET_SUCCESS');
export const resetPasswordFailed = createAction('PASSWORD_RESET_FAILED');

export const forgotPasswordRequest = createAction('FORGOT_PASSWORD_REQUEST');
export const forgotPasswordSuccess = createAction('FORGOT_PASSWORD_SUCCESS');
export const forgotPasswordFailed = createAction('FORGOT_PASSWORD_FAILED');

export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
export const logoutFailed = createAction('LOGOUT_FAILED');

export function getUser() {

    return function (dispatch) {

        dispatch(getUserRequest());

        getUserReq().then(getResponse).then((res) => {
            dispatch(getUserSuccess(res.user));
        }).catch((error) => {
            dispatch(getUserFailed(error));
        });
    }
}

export function updateUser(form) {

    return function (dispatch) {

        dispatch(updateUserRequest());

        updateUserReq(form).then(getResponse).then((res) => {
            dispatch(updateUserSuccess(res.user));
        }).catch((error) => {
            dispatch(updateUserFailed(error));
        });
    }
}
export function register(form) {

    return function (dispatch) {
        dispatch(registerRequest());

        registerReq(form).then(getResponse).then((res) => {

            dispatch(registerSuccess(res.user));
            setTokenCookie(res);
        }).catch((error) => {
            dispatch(registerFailed(error));
        });
    }
}
export function login(form) {

    return function (dispatch) {
        dispatch(loginRequest());
        loginReq(form).then(getResponse).then((res) => {
            dispatch(loginSuccess(res.user));
            setTokenCookie(res);
        }).catch((error) => {
            dispatch(loginFailed(error));
        });
    }
}
export function forgotPassword(form) {

    return function (dispatch) {
        dispatch(forgotPasswordRequest());
        forgotPasswordReq(form).then(getResponse).then((res) => {
            dispatch(forgotPasswordSuccess(res));
        }).catch((error) => {
            dispatch(forgotPasswordFailed(error));
        });
    }
}

export function resetPassword(form) {

    return function (dispatch) {
        dispatch(resetPasswordRequest());
        forgotPasswordReq(form).then(getResponse).then((res) => {
            dispatch(resetPasswordSuccess(res));
        }).catch((error) => {
            dispatch(resetPasswordFailed(error));
        });
    }
}
