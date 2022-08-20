import * as actions from "../actions/burger-ingredients";
import {ingredient, ingredientBun} from "../../utils/data";
import {burgerIngredients} from "./burger-ingredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    activeTab: "bun",
    categories: {
        "bun": "Булки",
        "sauce": "Начинки",
        "main": "Соусы",
    }
}

describe('burger ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(burgerIngredients(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle updateActiveTab', () => {
        expect(
            burgerIngredients(initialState, {
                type: actions.updateActiveTab.type,
                payload: "main"
            })
        ).toEqual(
            {...initialState, activeTab: "main"}
        )
    })

    it('should handle getIngredients', () => {
        expect(
            burgerIngredients(initialState, {
                type: actions.getIngredients.type
            })
        ).toEqual(
            {
                ...initialState,
                ingredientsRequest: true,
                ingredientsFailed: false,
            }
        )
    })

    it('should handle getIngredientsSuccess', () => {
        expect(
            burgerIngredients(initialState, {
                type: actions.getIngredientsSuccess.type,
                payload: [ingredient, ingredientBun]
            })
        ).toEqual(
            {
                ...initialState,
                ingredientsRequest: false,
                ingredients: [
                    ingredient, ingredientBun
                ]
            }
        )
    })

    it('should handle getIngredientsFailed', () => {
        expect(
            burgerIngredients(initialState, {
                type: actions.getIngredientsFailed.type
            })
        ).toEqual(
            {
                ...initialState,
                ingredientsFailed: true,
                ingredientsRequest: false,
            }
        )
    })
})
