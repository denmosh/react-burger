import { createReducer } from '@reduxjs/toolkit'
import {getIngredientsFailed, getIngredients, getIngredientsSuccess} from "../actions/burger-ingredients";


const burgerIngredientsInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const burgerIngredients = createReducer(burgerIngredientsInitialState, (builder) => {
    builder
        .addCase(getIngredients, (state, action) => {
           console.log("get ing");
            return {
               ...state,
               ingredientsRequest: true,
               ingredientsFailed: false,
           }
        })
        .addCase(getIngredientsSuccess, (state, action) => {
           return {
               ...state,
               ingredients: action.payload,
               ingredientsRequest: false,
           }
        })
        .addCase(getIngredientsFailed, (state, action) => {
           return {
               ...state,
               ingredientsFailed: true,
               ingredientsRequest: false,
           }
        }).addDefaultCase((state, action) => {
            return state
        })
});
