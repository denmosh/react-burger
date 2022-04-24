import React, {useState} from 'react';
import style from "./ingredient-details.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import Modal from "../modal/modal";

function IngredientDetails(props) {

    const[isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }
    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const modal = (
        <Modal onClose={handleCloseModal} title={"Детали ингредиента"}>
            <>
                <img className={style.image} src={props.image_large} alt={props.name}/>
                <h3 className={`${style.name} text_type_main-medium mt-4 mb-8`}>{props.name}</h3>
                <div className={style.details}>
                    <div className={style.detailsItem}>
                        <p className={"text_type_main-default text_color_inactive mb-2"}>Калории, ккал</p>
                        <p className={"text_color_inactive text_type_digits-default "}>{props.calories}</p>
                    </div>
                    <div className={style.detailsItem}>
                        <p className={"text_type_main-default text_color_inactive mb-2"}>Белки, г</p>
                        <p className={"text_color_inactive text_type_digits-default"}>{props.proteins}</p>
                    </div>
                    <div className={style.detailsItem}>
                        <p className={"text_type_main-default text_color_inactive mb-2"}>Жиры, г</p>
                        <p className={"text_color_inactive text_type_digits-default"}>{props.fat}</p>
                    </div>
                    <div className={style.detailsItem}>
                        <p className={"text_type_main-default text_color_inactive mb-2"}>Углеводы, г</p>
                        <p className={"text_color_inactive text_type_digits-default"}>{props.carbohydrates}</p>
                    </div>
                </div>
            </>
        </Modal>
    );

    return (
        <>
        <div className={`${style.item} mb-8`} onClick={handleOpenModal}>
            {props.counter !== 0 && <Counter count={props.counter}/>}
            <img className={`ml-4 mr-4`} src={props.image} alt={props.name}/>
            <div className={`${style.price} pt-1 pb-1`}>
                <span className={"mr-2 text text_type_digits-default"}>{props.price}</span>
                <CurrencyIcon type={"primary"}/>
            </div>
            <span className={`${style.name} text_type_main-default`}>{props.name}</span>
        </div>
        {isOpenModal && modal}
        </>
    );
}

IngredientDetails.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    counter: PropTypes.number.isRequired
}

export default IngredientDetails;