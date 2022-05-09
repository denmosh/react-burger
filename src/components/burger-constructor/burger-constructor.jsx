import React, {useState, useContext, useReducer, useEffect} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {IngredientsContext} from "../../services/ingredients-context";
import {OrderContext} from "../../services/order-context";
import {API_URL} from "../../constants/constants";

const totalInitialState = { total: 0 };

function reducer(state, action){
    switch (action.type) {
        case "count":
            let total = 0;
            action.ingredients.map((ingredient) => {
                total += ingredient.price;
                if(ingredient.type === "bun"){
                    total += ingredient.price;
                }
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

    const[orderDetails, setOrderDetails] = useState({});

    const[totalState, dispatch] = useReducer(reducer, totalInitialState, undefined);

    const {ingredients} = useContext(IngredientsContext);

    useEffect(()=>{
        dispatch({type: "count", ingredients: ingredients});
    }, [ingredients])

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }
    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const handleClickOrder = () =>{
        createOrder();
    }

    const createOrder = () => {
        fetch(API_URL + "api/orders",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: ingredients.map(({_id}) => _id)})
        })
            .then(res => {
                if (res.ok || res.status === 400) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((res) => {
                setOrderDetails(res);
                handleOpenModal();
            }).catch((error)=>{
            setOrderDetails({success: false});
            handleOpenModal();
            console.log(error);
        });
    }


    const modal = (
        <Modal onClose={handleCloseModal} >
            <OrderContext.Provider value={{orderDetails, setOrderDetails}}>
                <OrderDetails />
            </OrderContext.Provider>
        </Modal>
    );

    const bun = ingredients.filter(({type}) => type === "bun")[0];

    return (
        <div className={`mt-25 pl-4`}>
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