import React, {Component} from 'react';
import {ingredients} from '../../utils/data.js';
import {CurrencyIcon, Counter, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from './burger-ingredients.module.css';

class BurgerIngredients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
                loading: true,
                hasError: false,
                tab: "bun"
        };
        this.setTab = this.setTab.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading: false,
            hasError: false,
            ingredients: ingredients,
        })
    }

    setTab(value){
        this.setState({...this.state, tab: value});
    }

    render() {
        const { ingredients, isLoading, hasError } = this.state;

        return (
            <div className={burgerIngredientsStyle.burgerIngredients}>
                <div style={{display: 'flex'}}>
                    <Tab value="bun" active={this.state.tab === 'bun'} onClick={this.setTab}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={this.state.tab === 'sauce'} onClick={this.setTab}>
                        Начинки
                    </Tab>
                    <Tab value="main" active={this.state.tab === 'main'} onClick={this.setTab}>
                        Соусы
                    </Tab>
                </div>
                <div className={burgerIngredientsStyle.tabContent}>
                    {isLoading && 'Загрузка...'}
                    {hasError && 'Произошла ошибка'}
                    {!isLoading &&
                    !hasError &&
                    !!ingredients.length &&
                    ingredients.filter(({type}) => type === this.state.tab).map(({_id, image, name, price}) => {
                        return (
                            <div className={`${burgerIngredientsStyle.burgerIngredient} mt-6 mb-10 ml-4`}  key={_id}>
                                <Counter count={1}/>
                                <img src={image} alt={name} />
                                <div className="price">
                                    <span>{price}</span>
                                    <CurrencyIcon/>
                                </div>
                                <span>{name}</span>
                            </div>
                        )
                    })}
                </div>

            </div>
        );
    }
}

export default BurgerIngredients;