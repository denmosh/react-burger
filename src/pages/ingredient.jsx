import React, {useEffect, useState} from 'react';
import {getBurgerIngredients} from "../services/actions/burger-ingredients";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {setIngredient} from "../services/actions/current-ingredient";
import {useParams} from "react-router-dom";
import  styles from './ingredient.module.css';
import {currentIngredient} from "../services/reducers/current-ingredient";

export function IngredientPage() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(store => store.burgerIngredients);
    const {ingredient} = useSelector(store => store.currentIngredient);

    useEffect(()=>{
        if(ingredients.length !== 0){
            dispatch(setIngredient(ingredients.find(x => x._id === id)));
        }
    }, [ingredients])

    if(ingredientsRequest){
        return (
            <p>Страница загружается</p>
        )
    }

    if(ingredientsFailed){
        return (
            <p>Ошибка при получении данных. Попробуйте перезагрузить страницу</p>
        )
    }

    if(Object.keys(ingredient).length !== 0){
        return (
            <div className={styles.wrapper}>
                <IngredientDetails/>
            </div>
        );
    }

}