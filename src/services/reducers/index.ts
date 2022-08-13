
// Корневой редьюсер
import {combineReducers} from "redux";
import {orderDetails} from "./order-details";
import {burgerConstructor} from "./burger-constructor";
import {burgerIngredients} from "./burger-ingredients";
import {currentIngredient} from "./current-ingredient";
import {user} from "./user";
import {wsReducer} from "./ws-reducer";
import {currentOrder} from "./current-order";

export const rootReducer = combineReducers({
    orderDetails,
    burgerIngredients,
    burgerConstructor,
    currentIngredient,
    user,
    wsReducer,
    currentOrder
})