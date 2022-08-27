import * as actions from "../actions/ws-actions";
import {wsReducer} from "./ws-reducer";

const initialState = {
    wsConnected: false,
    orders: [],
    total:0,
    totalToday: 0
};
const orders = {
    orders: [{
        _id: "6300d05742d34a001c281c6d",
        ingredients: ["60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733c7",],
        status: "done",
        name: "Space флюоресцентный бургер",
        createdAt: "2022-08-20T12:15:19.497Z",
        updatedAt: "2022-08-20T12:15:19.751Z",
        number: 23351
    }],
    total: 1,
    totalToday: 1
}

describe('websocket reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle wsConnectionSuccess', () => {
        expect(
            wsReducer(initialState, {
                type: actions.wsConnectionSuccess.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                wsConnected: true
            }
        )
    })

    it('should handle wsConnectionError', () => {
        expect(
            wsReducer(initialState, {
                type: actions.wsConnectionError.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                wsConnected: false
            }
        )
    })

    it('should handle wsConnectionClosed', () => {
        expect(
            wsReducer(initialState, {
                type: actions.wsConnectionClosed.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                wsConnected: false
            }
        )
    })

    it('should handle wsGetMessage', () => {
        expect(
            wsReducer(initialState, {
                type: actions.wsGetMessage.type,
                payload: orders
            })
        ).toEqual(
            {
                ...initialState,
                ...orders
            }
        )
    })

})
