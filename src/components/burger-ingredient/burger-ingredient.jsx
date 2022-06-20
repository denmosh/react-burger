import React, {useEffect, useState} from 'react';
import style from "./burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from 'prop-types';
import ingredientPropTypes from "../../constants/ingredient-prop-types";
import {useDispatch, useSelector} from "react-redux";
import {setIngredient, clearIngredient} from "../../services/actions/current-ingredient";
import {useHistory, useLocation} from 'react-router-dom';
import {useDrag} from "react-dnd";

function BurgerIngredient(props) {

    const[isOpenModal, setIsOpenModal] = useState(false);

    const { ingredient } = props;
    const[count, setCount] = useState(0);

    const {ingredients} = useSelector(store => store.burgerConstructor);

    const history = useHistory();
    const location = useLocation();
    const [{ isDrag }, drag] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    useEffect(()=>{
        setCount(ingredients.filter((item) => item._id === ingredient._id).length);
    }, [ingredients])


    const dispatch = useDispatch();

    const handleOpenModal = () => {

        history.push({
            pathname: `/ingredients/${ props.ingredient._id }`,
            state: { background: location }
        })
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



    return (
        <>
            <div ref={drag} className={`${style.item} mb-8`} onClick={handleOpenModal}>
                {count !== 0 && <Counter count={count}/>}
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