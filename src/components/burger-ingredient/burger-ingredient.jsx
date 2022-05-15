import React, {useState} from 'react';
import style from "./burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from 'prop-types';
import ingredientPropTypes from "../../constants/ingredient-prop-types";
import {useDispatch} from "react-redux";
import {setIngredient, clearIngredient} from "../../services/actions/current-ingredient";

function BurgerIngredient(props) {

    const[isOpenModal, setIsOpenModal] = useState(false);

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(setIngredient(props.ingredient));
        setIsOpenModal(true);
    }
    const handleCloseModal = () => {
        dispatch(clearIngredient());
        setIsOpenModal(false);
    }

    const modal = (
        <Modal onClose={handleCloseModal} title={"Детали ингредиента"}>
            <IngredientDetails/>
        </Modal>
    );

    const { counter, ingredient } = props;

    return (
        <>
            <div className={`${style.item} mb-8`} onClick={handleOpenModal}>
                {counter !== 0 && <Counter count={counter}/>}
                <img className={`ml-4 mr-4`} src={ingredient.image} alt={ingredient.name}/>
                <div className={`${style.price} pt-1 pb-1`}>
                    <span className={"mr-2 text text_type_digits-default"}>{ingredient.price}</span>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <span className={`${style.name} text_type_main-default`}>{ingredient.name}</span>
            </div>
            {isOpenModal && modal}
        </>
    );
}


BurgerIngredient.propTypes = {
    ingredient: ingredientPropTypes,
    counter: PropTypes.number.isRequired
}

export default BurgerIngredient;