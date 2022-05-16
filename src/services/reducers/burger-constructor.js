import { createReducer } from '@reduxjs/toolkit'
import {addIngredient, removeIngredient, replaceIngredientBun} from "../actions/burger-constructor";



const burgerConstructorInitialState = {
    ingredients: [],
}

export const burgerConstructor = createReducer(burgerConstructorInitialState, (builder) => {
    builder
        .addCase(addIngredient, (state, action) => {
            state.ingredients.push(action.payload);
        })
        .addCase(removeIngredient, (state, action) => {
            state.ingredients.splice(action.payload.index, 1)
            // return {
            //     ingredients:  state.ingredients.splice(action.payload.index, 1)
            // }
        })
        .addCase(replaceIngredientBun, (state, action) => {
            return {
                ingredients:  state.ingredients.map((item, index)=>{
                    return (item.type === 'bun') ? action.payload : item;
                })
            }

        })
});