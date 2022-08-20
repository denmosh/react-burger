import * as actions from "../actions/order-details";
import {ingredient, ingredientBun} from "../../utils/data";
import {orderDetails} from "./order-details";

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    orderModal: false,
    total: 0,
}

describe('order details reducer', () => {
    it('should return the initial state', () => {
        expect(orderDetails(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle createOrderRequest', () => {
        expect(
            orderDetails(initialState, {
                type: actions.createOrderRequest.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                orderRequest: true,
                orderFailed: false,
            }
        )
    })

    it('should handle createOrderSuccess', () => {
        expect(
            orderDetails(initialState, {
                type: actions.createOrderSuccess.type,
                payload: {
                    order: { number: 123 }
                }
            })
        ).toEqual(
            {
                ...initialState,
                order: {number: 123},
                orderRequest: false,
            }
        )
    })

    it('should handle countOrderTotal', () => {
        expect(
            orderDetails(initialState, {
                type: actions.countOrderTotal.type,
                payload: [ingredient, ingredientBun]
            })
        ).toEqual(
            {
                ...initialState,
                total: ingredient.price + ingredientBun.price
            }
        )
    })

    it('should handle showOrderModal', () => {
        expect(
            orderDetails(initialState, {
                type: actions.showOrderModal.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                orderModal: true
            }
        )
    })

    it('should handle closeOderModal', () => {
        expect(
            orderDetails(initialState, {
                type: actions.closeOderModal.type,
                payload: {}
            })
        ).toEqual(
            {
                ...initialState,
                orderModal: false,
            }
        )
    })

    it('should handle createOrderFailed', () => {
        expect(
            orderDetails(initialState, {
                type: actions.createOrderFailed.type,
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
