import React from 'react';
import style from "../burger-ingredient/burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

function BurgerIngredient(props) {

    return (
        <div className={`${style.item} mb-8`}>
            {props.counter !== 0 && <Counter count={props.counter}/>}
            <img className={`ml-4 mr-4`} src={props.image} alt={props.name}/>
            <div className={`${style.price} pt-1 pb-1`}>
                <span className={"mr-2 text text_type_digits-default"}>{props.price}</span>
                <CurrencyIcon type={"primary"}/>
            </div>
            <span className={`${style.name} text_type_main-default`}>{props.name}</span>
        </div>
    );
}

BurgerIngredient.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    counter: PropTypes.number.isRequired
}

export default BurgerIngredient;