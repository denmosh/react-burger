import React, {useEffect} from 'react';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ConstructorItem from "../constructor-item/constructor-item";

import {countOrderTotal, createOrder, closeOderModal} from "../../services/actions/order-details";
import { useHistory } from "react-router-dom";
import {useDrop} from "react-dnd";
import {
    addIngredient,
    addIngredientBun,
    removeIngredient,
    replaceIngredientBun
} from "../../services/actions/burger-constructor";
import {getCookie} from "../../services/utils";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {IIngredient} from "../../services/interfaces/interfaces";

function BurgerConstructor() {

    const dispatch = useAppDispatch()

    const {ingredients} = useAppSelector((store) => store.burgerConstructor);
    const {total, orderRequest, orderModal} = useAppSelector(store => store.orderDetails);
    const {user} = useAppSelector(store => store.user);

    const bun = ingredients.filter(({type}) => type === "bun")[0];
    const history = useHistory();
    const [, drop] = useDrop<IIngredient>({
        accept: "ingredient",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            if(item.type === "bun"){
                if(!!bun){
                    dispatch(replaceIngredientBun(item))
                }else{
                    dispatch(addIngredientBun(item))
                }
            }else{
                dispatch(addIngredient(item))
            }
        },
    });

    useEffect(()=>{
        dispatch(countOrderTotal(ingredients));
    }, [ingredients])


    const handleCloseModal = () => {
        dispatch(closeOderModal());
    }
    const handleRemoveIngredient = (uuid:string) => {
        dispatch(removeIngredient({uuid: uuid}));
    }

    const handleClickOrder = () =>{
        if(user.email || getCookie("refreshToken") !== undefined){
            dispatch(createOrder(ingredients.map(({_id}) => _id)));
        }else{
            history.push("/login", {state: { from: '/' }});
        }
    }

    const modal = (
        <Modal onClose={handleCloseModal} >
            <OrderDetails />
        </Modal>
    );

    const placeholder = (ingredients.length === 0) ? (
        <div className={`${style.placeholder}`}>
            <p className={"text text_type_main-default text_color_inactive p-5"}>Переместите ингредиенты для вашего бургера в данную область.<br/>
                Не забудьте добавить булку.</p>
        </div>
    ) : ''
    const button = (
        // @ts-ignore
        <Button onClick={handleClickOrder} size={"large"} disabled={bun === undefined} type={"primary"}>Оформить заказ</Button>
    );
    return (
        <div ref={drop} className={`mt-25 pl-4`}>
            <div className={`${style.constructor}`}>
                {placeholder}
                <div className={`${style.wrapper} mr-4`}>
                    {bun && (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    )}
                </div>
                <div className={`${style.constructor} ${style.main}`}>
                    {ingredients.filter(({type}) => type !== "bun").map((ingredient, index) => {
                        return (
                            <ConstructorItem key={ingredient.uuid} ingredient={ingredient} index={index + 2} handleRemoveItem={handleRemoveIngredient} />
                        )
                    })}
                </div>
                <div className={`${style.wrapper} mr-4`}>
                    {bun && (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    )}
                </div>
            </div>
            <div className={`${style.wrapper} mr-4 mt-10`}>
                { orderRequest && (
                    <div className={`${style.loader} mr-5`}></div>
                )}
                <div className="price mr-10">
                    <span className="text_type_digits-medium mr-2">{total}</span>
                    <CurrencyIcon type={"primary"}/>
                </div>
                {button}
            </div>
            {orderModal && modal}
        </div>
    );
}

export default BurgerConstructor;