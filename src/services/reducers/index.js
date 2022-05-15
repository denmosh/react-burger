
// Корневой редьюсер
import {combineReducers} from "redux";
import {app} from "./app";
import {orderDetails} from "./order-details";
import {burgerConstructor} from "../actions/burger-constructor";
import {burgerIngredients} from "./burger-ingredients";
import {currentIngredient} from "./current-ingredient";

export const rootReducer = combineReducers({
    app,
    orderDetails,
    burgerIngredients,
    burgerConstructor,
    currentIngredient
})