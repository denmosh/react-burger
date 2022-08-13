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
import {deleteCookie, setTokenCookie} from "../utils";
import {
    IAuthorization,
    IError,
    IForgotPassword,
    ILogout,
    IRegistration,
    IResetPassword,
    IUser
} from "../interfaces/interfaces";
import {AppDispatch} from "../store";

export const getUserRequest = createAction('GET_USER_REQUEST');
export const getUserSuccess = createAction<IUser>('GET_USER_SUCCESS');
export const getUserFailed = createAction<IError>('GET_USER_FAILED');

export const updateUserRequest = createAction('UPDATE_USER_REQUEST');
export const updateUserSuccess = createAction<IUser>('UPDATE_USER_SUCCESS');
export const updateUserFailed = createAction<IError>('UPDATE_USER_FAILED');

export const registerRequest = createAction('REGISTER_REQUEST');
export const registerSuccess = createAction<IUser>('REGISTER_SUCCESS');
export const registerFailed = createAction<IError>('REGISTER_FAILED');

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction<IUser>('LOGIN_SUCCESS');
export const loginFailed = createAction<IError>('LOGIN_FAILED');

export const tokenRequest = createAction('TOKEN_REQUEST');
export const tokenSuccess = createAction('TOKEN_SUCCESS');
export const tokenFailed = createAction<IError>('TOKEN_FAILED');

export const resetPasswordRequest = createAction('PASSWORD_RESET_REQUEST');
export const resetPasswordSuccess = createAction('PASSWORD_RESET_SUCCESS');
export const resetPasswordFailed = createAction<IError>('PASSWORD_RESET_FAILED');

export const forgotPasswordRequest = createAction('FORGOT_PASSWORD_REQUEST');
export const forgotPasswordSuccess = createAction('FORGOT_PASSWORD_SUCCESS');
export const forgotPasswordFailed = createAction<IError>('FORGOT_PASSWORD_FAILED');

export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutSuccess = createAction<IUser>('LOGOUT_SUCCESS');
export const logoutFailed = createAction<IError>('LOGOUT_FAILED');

export function handleError(dispatch:AppDispatch, error:IError, action:any, params:any = null){
    if (error && error.message) {
        if(error.message === "jwt expired" || error.message === "jwt malformed"){
            dispatch(refreshToken(action, params));
        }
    }
}

export function getUser() {

    return function (dispatch:AppDispatch) {

        dispatch(getUserRequest());

        getUserReq().then(getResponse).then((res) => {
            dispatch(getUserSuccess(res.user));
        }).catch((error) => {
            handleError(dispatch, error, getUser);
            dispatch(getUserFailed(error));
        });
    }
}

export function updateUser(form:IRegistration) {

    return function (dispatch:AppDispatch) {

        dispatch(updateUserRequest());

        updateUserReq(form).then(getResponse).then((res) => {
            dispatch(updateUserSuccess(res.user));
        }).catch((error) => {
            handleError(dispatch, error, updateUser, form)
            dispatch(updateUserFailed(error));
        });
    }
}
export function register(form:IRegistration) {

    return function (dispatch:AppDispatch) {
        dispatch(registerRequest());

        registerReq(form).then(getResponse).then((res) => {

            dispatch(registerSuccess(res.user));
            setTokenCookie(res);
        }).catch((error) => {
            dispatch(registerFailed(error));
        });
    }
}
export function login(form:IAuthorization) {

    return function (dispatch:AppDispatch) {
        dispatch(loginRequest());
        loginReq(form).then(getResponse).then((res) => {
            dispatch(loginSuccess(res.user));
            setTokenCookie(res);
        }).catch((error) => {
            dispatch(loginFailed(error));
        });
    }
}
export function logout(form:ILogout) {

    return function (dispatch:AppDispatch) {
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

export function refreshToken(action:any, params = null) {

    return function (dispatch:AppDispatch) {
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
export function forgotPassword(form:IForgotPassword) {

    return function (dispatch:AppDispatch) {
        dispatch(forgotPasswordRequest());
        forgotPasswordReq(form).then(getResponse).then(() => {
            dispatch(forgotPasswordSuccess());
        }).catch((error) => {
            dispatch(forgotPasswordFailed(error));
        });
    }
}

export function resetPassword(form:IResetPassword) {

    return function (dispatch:AppDispatch) {
        dispatch(resetPasswordRequest());
        passwordResetReq(form).then(getResponse).then(() => {
            dispatch(resetPasswordSuccess());
        }).catch((error) => {
            dispatch(resetPasswordFailed(error));
        });
    }
}
