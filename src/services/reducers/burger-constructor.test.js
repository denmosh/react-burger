import {burgerConstructor} from "./burger-constructor";
import * as actions from "../actions/burger-constructor";
import {v4 as uuid} from 'uuid';
import {ingredient} from "../../utils/data";
import {addIngredientBun, replaceIngredientBun} from "../actions/burger-constructor";

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
    it('should handle replaceIngredientBun', () => {
        expect(
            burgerConstructor({ingredients: [

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
    
})
