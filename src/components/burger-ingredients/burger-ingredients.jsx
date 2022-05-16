import React, {useState, useEffect, useRef} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import {useDispatch, useSelector} from "react-redux";
import {updateActiveTab} from "../../services/actions/burger-ingredients";


function BurgerIngredients(){

    const {categories, activeTab} = useSelector(store => store.burgerIngredients);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBurgerIngredients());
    },[])

    const {ingredients} = useSelector(store => store.burgerIngredients);

    const setActiveTab = (value) => {
        dispatch(updateActiveTab(value));
    }

    const refs = useRef([]);


    const handleScroll = (e) =>{

        let offsetParent = e.target.getBoundingClientRect().top;
        const offsetChildrens = refs.current.map((ref, index) => {
            return Math.abs(ref.getBoundingClientRect().top - offsetParent)
        })
        const min = Math.min(...offsetChildrens);
        const closestTab = refs.current[offsetChildrens.indexOf(min)].getAttribute("value");
        if(activeTab !== closestTab){
            dispatch(updateActiveTab(closestTab));
        }
    }

    return(
        <div className={`${style.container}`}>
            <h1 className={"text_type_main-large mt-10"}>Соберите бургер</h1>
            <div style={{display: 'flex'}} className={"pt-5 pb-10"}>
                {Object.keys(categories).map((key) => {
                    return (
                        <Tab value={key} key={key} active={activeTab === key} onClick={setActiveTab}>
                            {categories[key]}
                        </Tab>
                    )
                })}
            </div>
            <div onScroll={handleScroll} className={style.content}>
                {
                    !!ingredients.length &&
                    Object.keys(categories).map((key, index) => {
                        return (
                            <section key={index}>
                                <h3 ref={el => refs.current[index] = el} value={key} className={` text_type_main-medium`}>{categories[key]}</h3>
                                <div className={`${style.section} pt-6 pl-4 pr-4 pb-2`}>
                                    {ingredients.filter(({type}) => type === key).map((ingredient, index) => {
                                        return (
                                            <BurgerIngredient key={ingredient._id} counter={index % 5 === 0 ? 1 : 0} ingredient={ingredient}/>
                                        )
                                    })}
                                </div>
                            </section>
                        )
                    })
                }
            </div>
        </div>
    );
}


export default BurgerIngredients;