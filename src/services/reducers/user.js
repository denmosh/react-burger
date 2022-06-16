import { createReducer } from '@reduxjs/toolkit'
import {

    forgotPasswordFailed, forgotPasswordRequest, forgotPasswordSuccess,

    getUserFailed, getUserRequest, getUserSuccess,

    loginFailed, loginRequest, loginSuccess,

    logoutFailed, logoutRequest, logoutSuccess,

    resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess,

    registerFailed, registerRequest, registerSuccess,

    updateUserFailed, updateUserRequest, updateUserSuccess

} from "../actions/user";

const userInitialState = {
    
    getUserRequest: false,
    getUserFailed: false,
    
    updateUserRequest: false,
    updateUserFailed: false,
    
    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    tokenRequest: false,
    tokenFailed: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    forgotPasswordSuccess: false,

    logoutRequest: false,
    logoutFailed: false,
    
    user:{
        email: '',
        name: ''
    }
}

export const user = createReducer(userInitialState, (builder) => {
    builder
        .addCase(getUserRequest, (state, action) => {
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
            }
        })
        .addCase(getUserSuccess, (state, action) => {
            return {
                ...state,
                user: action.payload,
                getUserRequest: false,
            }
        })
        .addCase(getUserFailed, (state, action) => {
            return {
                ...state,
                getUserFailed: true,
                getUserRequest: false,
            }
        })
        .addCase(registerRequest, (state, action) => {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
            }
        })
        .addCase(registerSuccess, (state, action) => {
            return {
                ...state,
                user: action.payload,
                registerRequest: false,
            }
        })
        .addCase(registerFailed, (state, action) => {
            return {
                ...state,
                registerFailed: true,
                registerRequest: false,
            }
        })
        
        .addCase(updateUserRequest, (state, action) => {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false,
            }
        })
        .addCase(updateUserSuccess, (state, action) => {
            return {
                ...state,
                user: action.payload,
                updateUserRequest: false,
            }
        })
        .addCase(updateUserFailed, (state, action) => {
            return {
                ...state,
                updateUserFailed: true,
                updateUserRequest: false,
            }
        })

        .addCase(logoutRequest, (state, action) => {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false,
            }
        })
        .addCase(logoutSuccess, (state, action) => {
            return {
             ...userInitialState
            }
        })
        .addCase(logoutFailed, (state, action) => {
            return {
                ...state,
                logoutFailed: true,
                logoutRequest: false,
            }
        })
        .addCase(loginRequest, (state, action) => {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
            }
        })
        .addCase(loginSuccess, (state, action) => {
            return {
                ...state,
                user: action.payload,
                loginRequest: false,
            }
        })
        .addCase(loginFailed, (state, action) => {
            return {
                ...state,
                loginFailed: true,
                loginRequest: false,
            }
        })
        
        .addCase(forgotPasswordRequest, (state, action) => {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false,
            }
        })
        .addCase(forgotPasswordSuccess, (state, action) => {
            return {
                ...state,
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false,
            }
        })
        .addCase(forgotPasswordFailed, (state, action) => {
            return {
                ...state,
                forgotPasswordFailed: true,
                forgotPasswordRequest: false,
            }
        })
        
        .addCase(resetPasswordRequest, (state, action) => {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
            }
        })
        .addCase(resetPasswordSuccess, (state, action) => {
            return {
                ...state,
                resetPasswordSuccess: true,
                resetPasswordRequest: false,
            }
        })
        .addCase(resetPasswordFailed, (state, action) => {
            return {
                ...state,
                resetPasswordFailed: true,
                resetPasswordRequest: false,
            }
        })
        
        .addDefaultCase((state, action) => {
        return state
        })
});
