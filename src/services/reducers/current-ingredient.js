import { createReducer } from '@reduxjs/toolkit'
import {setIngredient, clearIngredient} from "../actions/current-ingredient";


const currentIngredientInitialState = {
    ingredient: {},
}

export const currentIngredient = createReducer(currentIngredientInitialState, (builder) => {
    builder
        .addCase(setIngredient, (state, action) => {
            return {ingredient: action.payload}
        })
        .addCase(clearIngredient, (state, action) => {
            return {ingredient: {}}
        })
});