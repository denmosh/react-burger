import React, {useState, useReducer, useEffect} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../services/actions/order-details";
import {useDrop} from "react-dnd";
import {addIngredient, removeIngredient, replaceIngredientBun} from "../../services/actions/burger-constructor";

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

    const [{ isHover } , drop] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            (item.type !== "bun")?
            dispatch(addIngredient(item)):
            dispatch(replaceIngredientBun(item))
        },
    });

    useEffect(()=>{
        dispatchTotal({type: "count", ingredients: ingredients});
    }, [ingredients])

    useEffect(()=>{
        if(allIngredients.length && ingredients.length == 0){
            const bun = allIngredients.filter(({type}) => type === "bun")[0];
            dispatch(addIngredient(bun));
            dispatch(addIngredient(bun));
        }
    }, [allIngredients])

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }
    const handleCloseModal = () => {
        setIsOpenModal(false);
    }
    const handleRemoveIngredient = (index) => {
        dispatch(removeIngredient({index: index}));
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

    const bun = ingredients.filter(({type}) => type === "bun")[0];

    return (
        <div ref={drop} className={`mt-25 pl-4`}>
            <div className={style.constructor}>
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
                            <div key={index} className={`${style.wrapper} mr-4`}>
                                <DragIcon type={"primary"}/>
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image_mobile}
                                    handleClose={e => handleRemoveIngredient(index + 2)}

                                />
                            </div>
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

                <Button onClick={handleClickOrder} size={"large"} type={"primary"}>Оформить заказ</Button>
            </div>
            {isOpenModal && modal}
        </div>
    );
}

export default BurgerConstructor;