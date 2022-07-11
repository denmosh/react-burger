import {createAction} from "@reduxjs/toolkit";
import {IIngredient} from "../interfaces/interfaces";

export const setIngredient = createAction<IIngredient>('SET_INGREDIENT');
export const clearIngredient = createAction('CLEAR_INGREDIENT');
