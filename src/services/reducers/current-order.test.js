import * as actions from "../actions/current-order";
import {order} from "../../utils/data";
import {currentOrder} from "./current-order";


const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
}

describe('current order reducer', () => {
    it('should return the initial state', () => {
        expect(currentOrder(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle setOrder', () => {
        expect(
            currentOrder(initialState, {
                type: actions.setOrder.type,
                payload: order
            })
        ).toEqual(
            {...initialState, order: order}
        )
    })

    it('should handle clearOrder', () => {
        expect(
            currentOrder(initialState, {
                type: actions.clearOrder.type
            })
        ).toEqual(
            {
                ...initialState,
                order: null,
            }
        )
    })

    it('should handle getOrderRequest', () => {
        expect(
            currentOrder(initialState, {
                type: actions.getOrderRequest.type
            })
        ).toEqual(
            {
                ...initialState,
                orderRequest: true,
                orderFailed: false,
            }
        )
    })

    it('should handle getOrderSuccess', () => {
        expect(
            currentOrder(initialState, {
                type: actions.getOrderSuccess.type,
                payload: order
            })
        ).toEqual(
            {
                ...initialState,
                order: order,
                orderRequest: false,
            }
        )
    })

    it('should handle getOrderFailed', () => {
        expect(
            currentOrder(initialState, {
                type: actions.getOrderFailed.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                orderFailed: true,
                orderRequest: false,
            }
        )
    })

})
