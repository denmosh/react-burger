import React from 'react';
import PropTypes from 'prop-types';
import ingredientPropTypes from "../constants/ingredient-prop-types";
export const IngredientsContext = React.createContext([]);

IngredientsContext.Provider.propTypes = {
    value: PropTypes.shape({
        ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
        setIngredients: PropTypes.func
    })
};