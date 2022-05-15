import { createReducer } from '@reduxjs/toolkit'


const currentIngredientInitialState = {
    ingredient: {},
}

export const currentIngredient = createReducer(currentIngredientInitialState, (builder) => {

});