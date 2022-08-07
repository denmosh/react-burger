import React, {useEffect, useMemo} from 'react';
import styles from './order-item-details.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import Moment from "moment";
import 'moment/locale/ru'
import {countPrice} from "../../services/utils";
import {getOrder} from "../../services/actions/current-order";
import {useParams} from "react-router-dom";
function OrderItemDetails() {
    const {order, orderFailed, orderRequest} = useAppSelector(store => store.currentOrder);
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients);
    const dispatch = useAppDispatch();
    const { id }:{ id: string} = useParams();
    Moment.locale('ru');
    const mapping = order?.ingredients.reduce((acc:{[key: string]: number}, ingredientId) => {
        acc[ingredientId] = (acc[ingredientId] || 0) + 1;
        return acc;
    }, {}) || {};
    const sum = useMemo(()=>
            countPrice(order?.ingredients || [], ingredients),
        [order?.ingredients, ingredients]);
    useEffect(()=>{
        if(!order){
            dispatch(getOrder(id));
        }
    },[])

    if(orderFailed) {
        return <>При загрузке возникла ошибка...</>
    }
    if(orderRequest) {
        return <>Загрузка заказа...</>
    }

    if(!order){
        return <>Загрузка заказа...</>
    }

    return (
            <div className={`${styles.wrapper}`}>
                <p className={`text_type_digits-default ${styles.textCenter}`}>#{order.number}</p>
                <h3 className={`mt-10 text_type_main-medium`}>{order.name}</h3>
                <p className={`mt-3 text_type_main-default text_color_success`}></p>
                <p className={`mt-15 mb-6 text_type_main-medium`}>Состав:</p>
                <div className={styles.ingredients}>
                    {Object.keys(mapping).map((ingredientId)=> {
                        let ingredient = ingredients.find(x => x._id === ingredientId)
                        return(
                            <div key={ingredientId} className={`mb-4 ${styles.ingredient}`}>
                                <div className={styles.iconWrapper} style={{backgroundImage: `url("${ingredient?.image_mobile}")`}} >
                                    <div className={styles.icon}></div>
                                </div>
                                <p className={`ml-4 text_type_main-default ${styles.name}`}>{ingredient?.name}</p>
                                <div className={`ml-4 ${styles.price}`}>
                                    <span className={`${styles.priceText} text_type_digits-default mr-2`}>{mapping[ingredientId]} x {ingredient?.price}</span>
                                    <CurrencyIcon type={"primary"}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={`${styles.bottomWrapper} mt-10`}>
                    <p className={`text_type_main-default text_color_inactive ${styles.date} ${styles.textLeft}`}>{Moment(order.createdAt).calendar()} i-GMT+3</p>
                    <div className={`ml-6 ${styles.price}`}>
                        <span className="text_type_digits-default mr-2">{sum}</span>
                        <CurrencyIcon type={"primary"}/>
                    </div>
                </div>
            </div>
    );
}

export default OrderItemDetails;