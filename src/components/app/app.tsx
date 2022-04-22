import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import {ingredients} from "../../utils/data";


class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            ingredients: [],
            loading: true,
            hasError: false,
            activeTab: "bun",
            categories: {
                bun: "Булки",
                sauce: "Начинки",
                main: "Соусы",
            }
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            loading: false,
            hasError: false,
            ingredients: ingredients,
        })
    }

    render() {
        return (
            <>
                <AppHeader/>
                <div className={appStyles.wrapper}>
                    <section className={appStyles.main}>
                        <BurgerIngredients ingredients={this.state.ingredients} categories={this.state.categories}/>
                        <BurgerConstructor ingredients={this.state.ingredients}/>
                    </section>
                </div>
            </>
        );
    }
}

export default App;
