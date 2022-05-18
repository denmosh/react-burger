import React, {useState, useReducer, useEffect} from 'react';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ConstructorItem from "../constructor-item/constructor-item";

import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../services/actions/order-details";
import {useDrop} from "react-dnd";
import {
    addIngredient,
    addIngredientBun,
    removeIngredient,
    replaceIngredientBun
} from "../../services/actions/burger-constructor";

const totalInitialState = { total: 0 };

function reducer(state, action){
    switch (action.type) {
        case "count":
            let total = 0;
            action.ingredients.map((ingredient) => {
                total += ingredient.price;
            })
            return {total: total}
        case "reset":
            return totalInitialState;
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

function BurgerConstructor() {

    const[isOpenModal, setIsOpenModal] = useState(false);

    const[totalState, dispatchTotal] = useReducer(reducer, totalInitialState, undefined);

    const dispatch = useDispatch();

    const {ingredients} = useSelector(store => store.burgerConstructor);
    const allIngredients = useSelector(store => store.burgerIngredients.ingredients);

    const bun = ingredients.filter(({type}) => type === "bun")[0];

    const [, drop] = useDrop({
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
        dispatchTotal({type: "count", ingredients: ingredients});
    }, [ingredients])

    useEffect(()=>{
        if(allIngredients.length && ingredients.length === 0){
            const bun = allIngredients.filter(({type}) => type === "bun")[0];
        }
    }, [allIngredients])

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }
    const handleCloseModal = () => {
        setIsOpenModal(false);
    }
    const handleRemoveIngredient = (uuid) => {
        dispatch(removeIngredient({uuid: uuid}));
    }

    const handleClickOrder = () =>{
        dispatch(createOrder(ingredients.map(({_id}) => _id)));
        handleOpenModal();
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


    return (
        <div ref={drop} className={`mt-25 pl-4`}>
            <div className={style.constructor}>
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
                <div className="price mr-10">
                    <span className="text_type_digits-medium mr-2">{totalState.total}</span>
                    <CurrencyIcon type={"primary"}/>
                </div>

                <Button onClick={handleClickOrder} size={"large"} disabled={bun === undefined} type={"primary"}>Оформить заказ</Button>
            </div>
            {isOpenModal && modal}
        </div>
    );
}

export default BurgerConstructor;