import React, {useEffect, useRef} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import {useDispatch, useSelector} from "react-redux";
import {updateActiveTab} from "../../services/actions/burger-ingredients";
import {useAppSelector} from "../../hooks/hooks";
import {IIngredient} from "../../services/interfaces/interfaces";


function BurgerIngredients(){

    const {categories, activeTab} = useAppSelector(store => store.burgerIngredients);

    const dispatch = useDispatch();

    const {ingredients} = useAppSelector(store => store.burgerIngredients);

    const setActiveTab = (value:string) => {
        dispatch(updateActiveTab(value));
    }

    const refs = useRef<Array<HTMLHeadingElement|null>>([]);


    const handleScroll = (e:React.SyntheticEvent<HTMLElement>) =>{

        let offsetParent = e.currentTarget.getBoundingClientRect().top;

        const offsetChildren:number[] = refs.current.map((ref, index) => {
            if(ref !== null)
                return Math.abs(ref.getBoundingClientRect().top - offsetParent)
            else return 0;
        })
        const min = Math.min(...offsetChildren);
        const closestTab = String(refs.current[offsetChildren.indexOf(min)]?.getAttribute("data-value"));

        if(activeTab !== closestTab){
            dispatch(updateActiveTab(closestTab));
        }
    }

    return(
        <div className={`${style.container}`}>
            <h1 className={"text_type_main-large mt-10"}>Соберите бургер</h1>
            <div style={{display: 'flex'}} className={"pt-5 pb-10"}>
                {Object.keys(categories).map((key) => {

                    return (
                        // @ts-ignore
                        <Tab value={key} key={key} active={activeTab === key} onClick={setActiveTab}>
                            {categories[key]}
                        </Tab>
                    )
                })}
            </div>
            <div onScroll={handleScroll} className={style.content}>
                {
                    !!ingredients.length &&
                    Object.keys(categories).map((key: string, index: number) => {
                        return (
                            <section key={index}>
                                <h3 ref={el => refs.current[index] = el} data-value={key} className={`text_type_main-medium`}>{categories[key]}</h3>
                                <div className={`${style.section} pt-6 pl-4 pr-4 pb-2`}>
                                    {ingredients.filter(({type}) => type === key).map((ingredient:IIngredient, index) => {
                                        return (
                                            <BurgerIngredient key={ingredient._id} counter={index % 5 === 0 ? 1 : 0} ingredient={ingredient}/>
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


export default BurgerIngredients;