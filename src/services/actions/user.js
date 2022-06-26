import {createAction} from "@reduxjs/toolkit";

import {getResponse} from "./common";
import {
    forgotPasswordReq,
    getUserReq,
    loginReq,
    logoutReq,
    passwordResetReq,
    registerReq,
    tokenReq,
    updateUserReq
} from "../api";
import {deleteCookie, setCookie, setTokenCookie} from "../utils";

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

export function handleError(dispatch, error, action, params = null){
    if (error && error.message) {
        if(error.message === "jwt expired" || error.message === "jwt malformed"){
            dispatch(refreshToken(action, params));
        }
    }
}

export function getUser() {

    return function (dispatch) {

        dispatch(getUserRequest());

        getUserReq().then(getResponse).then((res) => {
            dispatch(getUserSuccess(res.user));
        }).catch((error) => {
            handleError(dispatch, error, getUser);
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
            handleError(dispatch, error, updateUser, form)
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
export function logout(form) {

    return function (dispatch) {
        dispatch(logoutRequest());
        logoutReq(form).then(getResponse).then((res) => {
            dispatch(logoutSuccess(res.user));
            deleteCookie('token');
            deleteCookie('refreshToken');
        }).catch((error) => {
            dispatch(logoutFailed(error));
        });
    }
}

export function refreshToken(action, params = null) {

    return function (dispatch) {
        dispatch(tokenRequest());
        tokenReq().then(getResponse).then((res) => {
            setTokenCookie(res);
            dispatch(tokenSuccess());
            dispatch(params ? action(params) : action());
        }).catch((error) => {
            dispatch(tokenFailed(error));
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
        passwordResetReq(form).then(getResponse).then((res) => {
            dispatch(resetPasswordSuccess(res));
        }).catch((error) => {
            dispatch(resetPasswordFailed(error));
        });
    }
}
