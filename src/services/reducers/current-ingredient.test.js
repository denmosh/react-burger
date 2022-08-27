import * as actions from "../actions/current-ingredient";
import {ingredient} from "../../utils/data";
import {currentIngredient} from "./current-ingredient";


const initialState = {
    ingredient: null
}

describe('current ingredient reducer', () => {
    it('should return the initial state', () => {
        expect(currentIngredient(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle setIngredient', () => {
        expect(
            currentIngredient(initialState, {
                type: actions.setIngredient.type,
                payload: ingredient
            })
        ).toEqual(
            {ingredient}
        )
    })

    it('should handle clearIngredient', () => {
        expect(
            currentIngredient({ingredient}, {
                type: actions.clearIngredient.type
            })
        ).toEqual(
            {
                ingredient: null
            }
        )
    })

})
