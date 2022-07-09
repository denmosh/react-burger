import {API_URL} from "../constants/constants";
import {getCookie} from "./utils";


const login = 'api/auth/login';
const register = 'api/auth/register';
const logout = 'api/auth/logout';
const token = 'api/auth/token';
const user = 'api/auth/user';
const forgotPassword = 'api/password-reset';
const passwordReset = 'api/password-reset/reset';
const order = 'api/orders';


const extendOptions = (options: { headers?:object, [x: string]: unknown;}):object => {
    return {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    }
}

export const forgotPasswordReq = async (form:object) => {
    return await fetch(API_URL + forgotPassword, extendOptions({body: JSON.stringify(form)}));
}

export const passwordResetReq = async (form:object) => {
    return await fetch(API_URL + passwordReset, extendOptions({body: JSON.stringify(form)}));
}

export const updateUserReq = async (form:object) => {
    return await fetch(API_URL + user, extendOptions({
        body: JSON.stringify(form),
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + getCookie('token')
        },
    }));
}

export const tokenReq = async () => {
    return await fetch(API_URL + token, extendOptions({body: JSON.stringify({token: getCookie('refreshToken')})}));
}

export const logoutReq = async (form:object) => {
    return await fetch(API_URL + logout, extendOptions({body: JSON.stringify(form)}));
}

export const getUserReq = async () =>
    await fetch(API_URL + user, extendOptions({
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getCookie('token')
        },
    })
    );

export const loginReq = async (form:object) => {
    return await fetch(API_URL + login, extendOptions({body: JSON.stringify(form)}));
};

export const registerReq = async (form:object) => {
    return await fetch(API_URL + register, extendOptions({body: JSON.stringify(form)}));
};

export const createOrderReq = async (form:object) => {
    return await fetch(API_URL + order, extendOptions({
        body: JSON.stringify(form),
        headers: {
            Authorization: 'Bearer ' + getCookie('token')
        },
    }));
};