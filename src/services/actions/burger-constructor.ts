import {createAction} from "@reduxjs/toolkit";
import { IIngredient, IUuid } from "../interfaces/interfaces";

export const addIngredient = createAction<IIngredient>('ADD_INGREDIENT');
export const removeIngredient = createAction<IUuid>('REMOVE_INGREDIENT');
export const addIngredientBun = createAction<IIngredient>('ADD_INGREDIENT_BUN');
export const replaceIngredientBun = createAction<IIngredient>('REPLACE_INGREDIENT_BUN');
export const moveIngredient = createAction<{from: number, to:number}>('MOVE_INGREDIENT_BUN');
export const clearIngredients = createAction('CLEAR_INGREDIENTS');
