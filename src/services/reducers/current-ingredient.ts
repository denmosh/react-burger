import { createReducer } from '@reduxjs/toolkit'
import {setIngredient, clearIngredient} from "../actions/current-ingredient";
import {IIngredient} from "../interfaces/interfaces";


interface ICurrentIngredient {
    ingredient: IIngredient|null
}
const currentIngredientInitialState:ICurrentIngredient = {
    ingredient: null,
}

export const currentIngredient = createReducer(currentIngredientInitialState, (builder) => {
    builder
        .addCase(setIngredient, (state, action) => {
            return {ingredient: action.payload}
        })
        .addCase(clearIngredient, (state, action) => {
            return {ingredient: null}
        })
});