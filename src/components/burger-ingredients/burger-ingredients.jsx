import React, {Component} from 'react';
import {CurrencyIcon, Counter, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';

class BurgerIngredients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "bun",
        };
        this.setTab = this.setTab.bind(this);
    }

    setTab(value){
        this.setState({...this.state, activeTab: value});
    }

    render() {
        const { ingredients, isLoading, hasError, categories, activeTab } = this.state;

        return (
            <div className={`${style.container}`}>
                <h1 className={"text_type_main-large mt-10"}>Соберите бургер</h1>
                <div style={{display: 'flex'}} className={"pt-5 pb-10"}>
                    { Object.keys(categories).map((key, value) => {
                        return(
                            <Tab value={key} key={key} active={activeTab === key} onClick={this.setTab}>
                                {categories[key]}
                            </Tab>
                        )
                    })}
                </div>
                <div className={style.content}>
                    {isLoading && 'Загрузка...'}
                    {hasError && 'Произошла ошибка'}
                    {!isLoading &&
                    !hasError &&
                    !!ingredients.length &&
                    Object.keys(categories).map((key) => {
                            return(
                                <section>
                                <h3 className={` text_type_main-medium`}>{categories[key]}</h3>
                                 <div className={`${style.section} pt-6 pl-4 pr-4 pb-2`}>
                                     {ingredients.filter(({type}) => type === key).map(({_id, image, name, price}) => {
                                         return (
                                             <div
                                                 className={`${style.item} mb-8`}
                                                 key={_id}>
                                                 <Counter count={1}/>
                                                 <img className={`ml-4 mr-4`} src={image} alt={name}/>
                                                 <div className={`${style.price} pt-1 pb-1`}>
                                                     <span className={"mr-2 text text_type_digits-default"}>{price}</span>
                                                     <CurrencyIcon/>
                                                 </div>
                                                 <span className={`${style.name} text_type_main-default`}>{name}</span>
                                             </div>
                                         )
                                     })}
                                 </div>
                                </section>
                            )
                        })
  }
                </div>

            </div>
        );
    }
}

export default BurgerIngredients;