import React, {useEffect, useState} from 'react';
import style from "./burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import ingredientPropTypes from "../../constants/ingredient-prop-types";
import {useHistory, useLocation} from 'react-router-dom';
import {useDrag} from "react-dnd";
import {useAppSelector} from "../../hooks/hooks";
import {IIngredient} from "../../services/interfaces/interfaces";

function BurgerIngredient(props:{ingredient:IIngredient}) {

    const { ingredient } = props;
    const[count, setCount] = useState<number>(0);

    const {ingredients} = useAppSelector(store => store.burgerConstructor);

    const history = useHistory();
    const location = useLocation();
    const [, drag] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    useEffect(()=>{
        setCount(ingredients.filter((item) => item._id === ingredient._id).length);
    }, [ingredients])



    const handleOpenModal = () => {
        history.push({
            pathname: `/ingredients/${ props.ingredient._id }`,
            state: { background: location }
        })
    }

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
        </>
    );
}


BurgerIngredient.propTypes = {
    ingredient: ingredientPropTypes,
    counter: PropTypes.number.isRequired
}

export default BurgerIngredient;