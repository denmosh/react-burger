import {createAction} from "@reduxjs/toolkit";

export const addIngredient = createAction('ADD_INGREDIENT');
export const removeIngredient = createAction('REMOVE_INGREDIENT');
export const addIngredientBun = createAction('ADD_INGREDIENT_BUN');
export const replaceIngredientBun = createAction('REPLACE_INGREDIENT_BUN');
export const moveIngredient = createAction('MOVE_INGREDIENT_BUN');
export const clearIngredients = createAction('CLEAR_INGREDIENTS');
