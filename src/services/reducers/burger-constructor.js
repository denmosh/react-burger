import { createReducer } from '@reduxjs/toolkit'
import {
    addIngredient,
    addIngredientBun, clearIngredients,
    moveIngredient,
    removeIngredient,
    replaceIngredientBun
} from "../actions/burger-constructor";
import uuid from 'react-uuid';



const burgerConstructorInitialState = {
    ingredients: [],
}

export const burgerConstructor = createReducer(burgerConstructorInitialState, (builder) => {
    builder
        .addCase(addIngredient, (state, action) => {
            state.ingredients.push({...action.payload, uuid: uuid()});
        })
        .addCase(addIngredientBun, (state, action) => {
            state.ingredients.push({...action.payload, uuid: uuid()});
            state.ingredients.push({...action.payload, uuid: uuid()});
        })
        .addCase(removeIngredient, (state, action) => {
           return{
               ingredients: state.ingredients.filter(({uuid}) => uuid !== action.payload.uuid )
           }
        })
        .addCase(moveIngredient, (state, action) => {
            let ingredient =  state.ingredients[action.payload.from];
            state.ingredients.splice(action.payload.from, 1);
            state.ingredients.splice(action.payload.to, 0, ingredient);
        })
        .addCase(replaceIngredientBun, (state, action) => {
            return {
                ingredients:  state.ingredients.map((item, index)=>{
                    return (item.type === 'bun') ? {...action.payload, uuid: uuid() }: item;
                })
            }
        })
        .addCase(clearIngredients, (state, action) => {
            return {
                ingredients: []
            }
        })
});