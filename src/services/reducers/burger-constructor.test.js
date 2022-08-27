import {burgerConstructor} from "./burger-constructor";
import * as actions from "../actions/burger-constructor";
import {v4 as uuid} from 'uuid';
import {ingredient, ingredientBun} from "../../utils/data";

jest.mock('uuid', () => ({v4: () => 'hjhj87878'}));

describe('burger constructor reducer', () => {
    it('should return the initial state', () => {
        expect(burgerConstructor(undefined, {})).toEqual(
            {
                ingredients: []
            }
        )
    })

    it('should handle addIngredient', () => {
        expect(
            burgerConstructor({ingredients: []}, {
                type: actions.addIngredient.type,
                payload: ingredient
            })
        ).toEqual(
            {
                ingredients: [
                    {...ingredient, uuid: uuid()}
                ]
            }
        )
        expect(
            burgerConstructor({
                ingredients: [
                    {...ingredient, uuid: "123123"}
                ]}, {
                type: actions.addIngredient.type,
                payload: ingredient
            })
        ).toEqual({
            ingredients: [
                    {...ingredient, uuid: "123123" },
                    {...ingredient,uuid: uuid()}
                ]
            }
        )
    })

    it('should handle addIngredientBun', () => {
        expect(
            burgerConstructor({ingredients: []}, {
                type: actions.addIngredientBun.type,
                payload: ingredient
            })
        ).toEqual(
            {
                ingredients: [
                    {...ingredient, uuid: uuid()},
                    {...ingredient, uuid: uuid()}
                ]
            }
        )
    })

    it('should handle removeIngredient', () => {
        expect(
            burgerConstructor({ingredients: [
                    {...ingredient, uuid: '123'},
                    {...ingredient, uuid: '124'}
                ]}, {
                type: actions.removeIngredient.type,
                payload: {uuid: '123'}
            })
        ).toEqual(
            {
                ingredients: [
                    {...ingredient, uuid: '124'},
                ]
            }
        )
    })

    it('should handle moveIngredient', () => {
        expect(
            burgerConstructor({ingredients: [
                    {...ingredient, uuid: '000'},
                    {...ingredient, uuid: '111'},
                    {...ingredient, uuid: '222'},
                ]}, {
                type: actions.moveIngredient.type,
                payload: {from: 0, to: 2}
            })
        ).toEqual(
            {
                ingredients: [
                    {...ingredient, uuid: '111'},
                    {...ingredient, uuid: '222'},
                    {...ingredient, uuid: '000'},
                ]
            }
        )
    })
    it('should handle replaceIngredientBun', () => {
        expect(
            burgerConstructor({ingredients: [
                    {...ingredientBun, uuid: uuid()},
                    {...ingredientBun, uuid: uuid()}
                ]}, {
                type: actions.replaceIngredientBun.type,
                payload: ingredient
            })
        ).toEqual(
            {
                ingredients: [
                    {...ingredient, uuid: uuid()},
                    {...ingredient, uuid: uuid()}
                ]
            }
        )
    })

    it('should handle clearIngredients', () => {
        expect(
            burgerConstructor({ingredients: [
                    {...ingredientBun, uuid: uuid()},
                    {...ingredientBun, uuid: uuid()}
                ]}, {
                type: actions.clearIngredients.type
            })
        ).toEqual(
            {
                ingredients: []
            }
        )
    })
})
