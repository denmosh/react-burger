import React, {useEffect, useState} from 'react';
import {getBurgerIngredients} from "../services/actions/burger-ingredients";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {setIngredient} from "../services/actions/current-ingredient";
import {useParams} from "react-router-dom";
import  styles from './ingredient.module.css';

export function IngredientPage() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const {ingredients} = useSelector(store => store.burgerIngredients);
    const [ingredient, setCurrentIngredient] = useState({});

    useEffect(()=>{
        dispatch(getBurgerIngredients());
    },[])

    useEffect(()=>{
        if(ingredients.length !== 0){
            setCurrentIngredient(ingredients.find(x => x._id === id));
            dispatch(setIngredient(ingredient));
        }

        }, [ingredients]
    )

    if(ingredient){
        return (
            <div className={styles.wrapper}>
                <IngredientDetails/>
            </div>
        );
    }

}