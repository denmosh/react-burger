import { createReducer } from '@reduxjs/toolkit'
import {getIngredientsFailed, getIngredients, getIngredientsSuccess, updateActiveTab} from "../actions/burger-ingredients";
import {IIngredient} from "../interfaces/interfaces";

interface IBurgerIngredients {
    ingredients: Array<IIngredient>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    activeTab: string,
    categories: {
        [name:string]: string,
    }
}

const burgerIngredientsInitialState: IBurgerIngredients = {
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

export const burgerIngredients = createReducer(burgerIngredientsInitialState, (builder) => {
    builder
        .addCase(updateActiveTab, (state, action) => {
            return {
               ...state,
               activeTab: action.payload
           }
        })
        .addCase(getIngredients, (state, action) => {
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
