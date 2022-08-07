import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import styles from './order-item.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient, IOrderItem} from "../../services/interfaces/interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import Moment from 'moment';
import 'moment/locale/ru'
import {useHistory, useLocation} from "react-router-dom";
import {setOrder} from "../../services/actions/current-order";

type Porps = {
    order: IOrderItem;
}

function OrderItem({order}:Porps) {
    const {ingredients, name, createdAt, status, number} = order
    const ingredientsDetailed = useAppSelector(state => state.burgerIngredients.ingredients);
    const ingredientsRender = []
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    Moment.locale('ru');

    const handleOpenModal = () => {
        history.push({
            pathname: `/feed/${ order._id }`,
            state: { background: location }
        })
        dispatch(setOrder(order));
    }


    for(let i = 0; i < ingredients.length && i!==6; i++){
        let ingredient = ingredientsDetailed.find(x => x._id === ingredients[i])
            ingredientsRender.push(
                <div key={i} className={styles.iconWrapper} style={{
                    backgroundImage: `url("${ingredient && ingredient.image_mobile}")`,
                    zIndex: -i,
                    left: `-${i * 15}px`
                }}>
                    <div className={styles.icon}></div>
                    {i === 5 && ingredients.length > 6 && (<div
                        className={`text_type_main-default ${styles.iconNumbers}`}>+{ingredients.length - 3}</div>)}
                </div>
            )
    }

    const countPrice = (ingredients:Array<string>, ingredientsDetailed: Array<IIngredient>) => {
        return ingredients.reduce((accumulator, ingredientId) => {
            let ingredient = ingredientsDetailed.find(x => x._id === ingredientId)
            let price = ingredient ? ingredient.price : 0;
            return accumulator + price;
        }, 0);
    }
    const sum = useMemo(()=>
            countPrice(ingredients, ingredientsDetailed),
        [ingredients, ingredientsDetailed]);

    return (
        <div onClick={handleOpenModal} className={`${styles.container} p-6 mb-6`}>
            <div className={`${styles.topContainer} mb-6`}>
                <span className={`text_type_digits-default `}>#{number}</span>
                <span className={`text_type_main-default text_color_inactive ${styles.date}`}>{Moment(createdAt).calendar()} i-GMT+3</span>
            </div>
            <h3 className={`text_type_main-medium mb-6`}>{name}</h3>
            <div className={`${styles.bottomContainer}`}>
                <div className={`${styles.icons}`}>
                    {ingredientsRender}
                </div>

                <div className={`ml-6 ${styles.price}`}>
                    <span className="text_type_digits-default mr-2">{sum}</span>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>

        </div>
    );
}

export default OrderItem;