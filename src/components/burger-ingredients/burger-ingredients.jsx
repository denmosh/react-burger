import React, { useState } from 'react';
import {CurrencyIcon, Counter, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import PropTypes from 'prop-types';


function BurgerIngredients(props){

    const [activeTab, setActiveTab] = useState("bun");

    const {ingredients, categories} = props;

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
                                    {ingredients.filter(({type}) => type === key).map(({_id, image, name, price}, index) => {
                                        return (
                                            <div className={`${style.item} mb-8`} key={_id}>
                                                {index % 5 === 0 && <Counter count={1}/>}
                                                <img className={`ml-4 mr-4`} src={image} alt={name}/>
                                                <div className={`${style.price} pt-1 pb-1`}>
                                                    <span className={"mr-2 text text_type_digits-default"}>{price}</span>
                                                    <CurrencyIcon type={"primary"}/>
                                                </div>
                                                <span className={`${style.name} text_type_main-default`}>{name}</span>
                                            </div>
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


const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
    __v: PropTypes.number.isRequired
});

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    categories: PropTypes.shape({
        bun: PropTypes.string.isRequired,
        sauce: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
    }).isRequired
};

export default BurgerIngredients;