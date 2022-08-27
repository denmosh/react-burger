import * as actions from "../actions/user";
import {user} from "./user";

const userData = {
    email: 'moshkin.den@test.com',
    name: 'Den Mosh'
}

const initialState = {

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

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(user(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle getUserRequest', () => {
        expect(
            user(initialState, {
                type: actions.getUserRequest.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                getUserRequest: true,
                getUserFailed: false,
            }
        )
    })

    it('should handle getUserSuccess', () => {
        expect(
            user(initialState, {
                type: actions.getUserSuccess.type,
                payload: userData
            })
        ).toEqual(
            {
                ...initialState,
                user: userData,
                getUserRequest: false,
            }
        )
    })

    it('should handle getUserFailed', () => {
        expect(
            user(initialState, {
                type: actions.getUserFailed.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                getUserFailed: true,
                getUserRequest: false,
            }
        )
    })

    it('should handle registerRequest', () => {
        expect(
            user(initialState, {
                type: actions.registerRequest.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                registerRequest: true,
                registerFailed: false,
            }
        )
    })

    it('should handle registerSuccess', () => {
        expect(
            user(initialState, {
                type: actions.registerSuccess.type,
                payload: userData
            })
        ).toEqual(
            {
                ...initialState,
                user: userData,
                registerRequest: false,
            }
        )
    })

    it('should handle registerFailed', () => {
        expect(
            user(initialState, {
                type: actions.registerFailed.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                registerFailed: true,
                registerRequest: false,
            }
        )
    })

    it('should handle updateUserRequest', () => {
        expect(
            user(initialState, {
                type: actions.updateUserRequest.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                updateUserRequest: true,
                updateUserFailed: false,
            }
        )
    })

    it('should handle updateUserSuccess', () => {
        expect(
            user({...initialState, user: userData}, {
                type: actions.updateUserSuccess.type,
                payload: {name: "test", email: "test@ere.er"}
            })
        ).toEqual(
            {
                ...initialState,
                user: {name: "test", email: "test@ere.er"},
                updateUserRequest: false,
            }
        )
    })

    it('should handle updateUserFailed', () => {
        expect(
            user({...initialState, user: userData}, {
                type: actions.updateUserFailed.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                user: userData,
                updateUserFailed: true,
                updateUserRequest: false,
            }
        )
    })


    it('should handle logoutRequest', () => {
        expect(
            user({...initialState, user: userData}, {
                type: actions.logoutRequest.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                user: userData,
                logoutRequest: true,
                logoutFailed: false,
            }
        )
    })

    it('should handle logoutSuccess', () => {
        expect(
            user({...initialState, user: userData}, {
                type: actions.logoutSuccess.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                user: {
                    name: "",
                    email: "",
                },
            }
        )
    })

    it('should handle logoutFailed', () => {
        expect(
            user({...initialState, user: userData}, {
                type: actions.logoutFailed.type,
                payload: {}
            })
        ).toEqual(
            {
                ...{...initialState, user: userData},
                logoutFailed: true,
                logoutRequest: false,
            }
        )
    })

    it('should handle tokenRequest', () => {
        expect(
            user(initialState, {
                type: actions.tokenRequest.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                tokenRequest: true,
                tokenFailed: false,
            }
        )
    })

    it('should handle tokenSuccess', () => {
        expect(
            user(initialState, {
                type: actions.tokenSuccess.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                tokenFailed: false,
                tokenRequest: false,
            }
        )
    })

    it('should handle tokenFailed', () => {
        expect(
            user(initialState, {
                type: actions.tokenFailed.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                tokenFailed: true,
                tokenRequest: false,
            }
        )
    })

    it('should handle loginRequest', () => {
        expect(
            user(initialState, {
                type: actions.loginRequest.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                loginRequest: true,
                loginFailed: false,
            }
        )
    })

    it('should handle loginSuccess', () => {
        expect(
            user(initialState, {
                type: actions.loginSuccess.type,
                payload: userData
            })
        ).toEqual(
            {
                ...initialState,
                user: userData,
                loginRequest: false,
            }
        )
    })

    it('should handle loginFailed', () => {
        expect(
            user(initialState, {
                type: actions.loginFailed.type,
                payload: userData
            })
        ).toEqual(
            {
                ...initialState,
                loginFailed: true,
                loginRequest: false,
            }
        )
    })

    it('should handle forgotPasswordRequest', () => {
        expect(
            user(initialState, {
                type: actions.forgotPasswordRequest.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false,
            }
        )
    })

    it('should handle forgotPasswordSuccess', () => {
        expect(
            user(initialState, {
                type: actions.forgotPasswordSuccess.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false,
            }
        )
    })

    it('should handle forgotPasswordFailed', () => {
        expect(
            user(initialState, {
                type: actions.forgotPasswordFailed.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                forgotPasswordFailed: true,
                forgotPasswordRequest: false,
            }
        )
    })

    it('should handle resetPasswordRequest', () => {
        expect(
            user(initialState, {
                type: actions.resetPasswordRequest.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
            }
        )
    })

    it('should handle resetPasswordSuccess', () => {
        expect(
            user(initialState, {
                type: actions.resetPasswordSuccess.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                resetPasswordSuccess: true,
                resetPasswordRequest: false,
            }
        )
    })

    it('should handle resetPasswordFailed', () => {
        expect(
            user(initialState, {
                type: actions.resetPasswordFailed.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                resetPasswordFailed: true,
                resetPasswordRequest: false,
            }
        )
    })

})
