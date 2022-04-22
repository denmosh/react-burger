import React, {Component} from 'react';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import PropTypes from 'prop-types';

class BurgerConstructor extends Component {

    render() {
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
                        {this.props.ingredients.filter(({type}) => type !== "bun").map((ingredient) => {
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
                    <Button size={"large"} type={"primary"}>Оформить заказ</Button>
                </div>
            </div>
        );
    }
}

const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
    __v: PropTypes.number.isRequired
});

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;