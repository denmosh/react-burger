import {API_URL} from "../constants/constants";
import {getCookie} from "./utils";

const login = 'api/auth/login';
const register = 'api/auth/register';
const logout = 'api/auth/logout';
const token = 'api/auth/token';
const forgotPassword = 'api/password-reset';
const passwordReset = 'api/password-reset/reset';


const getPostOptions = form => {
    return {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    }
}

export const forgotPasswordReq = async form => {
    return await fetch(API_URL + forgotPassword, getPostOptions(form));
}

export const passwordResetReq = async form => {
    return await fetch(API_URL + passwordReset, getPostOptions(form));
}

export const updateUserReq = async form => {

}

export const tokenReq = async form => {

}

export const logoutReq = async form => {

}

export const getUserReq = async () =>
    await fetch('https://cosmic.nomoreparties.space/api/user', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

export const loginReq = async form => {
    return await fetch(API_URL + login, getPostOptions(form));
};

export const registerReq = async form => {
    return await fetch(API_URL + register, getPostOptions(form));
};