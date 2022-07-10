import React, {useEffect, useState} from 'react';
import {getBurgerIngredients} from "../services/actions/burger-ingredients";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {setIngredient} from "../services/actions/current-ingredient";
import {useParams} from "react-router-dom";
import  styles from './ingredient.module.css';

import {useAppSelector} from "../hooks/hooks";

export function IngredientPage() {

    const dispatch = useDispatch();
    const { id }:{ id: string} = useParams();
    const {ingredients, ingredientsRequest, ingredientsFailed} = useAppSelector(store => store.burgerIngredients);
    const {ingredient} = useAppSelector(store => store.currentIngredient);

    useEffect(()=>{
        if(ingredients.length !== 0){
            let ing = ingredients.find(x => x._id === id);
            if(ing !== undefined)
                dispatch(setIngredient(ing));
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

    if(ingredient !== null){
        return (
            <div className={styles.wrapper}>
                <IngredientDetails/>
            </div>
        );
    }

}