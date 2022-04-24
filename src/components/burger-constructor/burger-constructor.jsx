import React, {useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from "../../constants/ingredient-prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor(props) {

    const[isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }
    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const modal = (
        <Modal onClose={handleCloseModal} >
            <OrderDetails id={"034536"} />
        </Modal>
    );

    return (
        <div className={`mt-25 pl-4`}>
            <div className={style.constructor}>
                <div className={`${style.wrapper} mr-4`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
                    />
                </div>
                <div className={`${style.constructor} ${style.main}`}>
                    {props.ingredients.filter(({type}) => type !== "bun").map((ingredient) => {
                        return (
                            <div key={ingredient._id} className={`${style.wrapper} mr-4`}>
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
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
                    />
                </div>
            </div>
            <div className={`${style.wrapper} mr-4 mt-10`}>
                <div className="price mr-10">
                    <span className="text_type_digits-medium mr-2">610</span>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <Button onClick={handleOpenModal} size={"large"} type={"primary"}>Оформить заказ</Button>
            </div>
            {isOpenModal && modal}
        </div>
    );
}


BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;