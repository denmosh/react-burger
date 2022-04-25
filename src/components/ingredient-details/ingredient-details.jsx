import React from 'react';
import style from "./ingredient-details.module.css";
import ingredientPropTypes from "../../constants/ingredient-prop-types";

function IngredientDetails({ingredient}) {

    return (
        <>
            <img className={style.image} src={ingredient.image_large} alt={ingredient.name}/>
            <h3 className={`${style.name} text_type_main-medium mt-4 mb-8`}>{ingredient.name}</h3>
            <div className={style.details}>
                <div className={style.detailsItem}>
                    <p className={"text_type_main-default text_color_inactive mb-2"}>Калории, ккал</p>
                    <p className={"text_color_inactive text_type_digits-default "}>{ingredient.calories}</p>
                </div>
                <div className={style.detailsItem}>
                    <p className={"text_type_main-default text_color_inactive mb-2"}>Белки, г</p>
                    <p className={"text_color_inactive text_type_digits-default"}>{ingredient.proteins}</p>
                </div>
                <div className={style.detailsItem}>
                    <p className={"text_type_main-default text_color_inactive mb-2"}>Жиры, г</p>
                    <p className={"text_color_inactive text_type_digits-default"}>{ingredient.fat}</p>
                </div>
                <div className={style.detailsItem}>
                    <p className={"text_type_main-default text_color_inactive mb-2"}>Углеводы, г</p>
                    <p className={"text_color_inactive text_type_digits-default"}>{ingredient.carbohydrates}</p>
                </div>
            </div>
        </>
    );
}


IngredientDetails.propTypes = {
    ingredient: ingredientPropTypes
}

export default IngredientDetails;