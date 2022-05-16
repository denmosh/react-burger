import React, {useState, useEffect} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import {useDispatch, useSelector} from "react-redux";


function BurgerIngredients(props){

    const [activeTab, setActiveTab] = useState("bun");

    const {categories} = props;

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBurgerIngredients());
    },[])

    const {ingredients} = useSelector(store => store.burgerIngredients);

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
            <div className={style.content}>
                {
                    !!ingredients.length &&
                    Object.keys(categories).map((key, index) => {
                        return (
                            <section key={index}>
                                <h3 className={` text_type_main-medium`}>{categories[key]}</h3>
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


BurgerIngredients.propTypes = {
    categories: PropTypes.shape({
        bun: PropTypes.string.isRequired,
        sauce: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
    }).isRequired
};

export default BurgerIngredients;