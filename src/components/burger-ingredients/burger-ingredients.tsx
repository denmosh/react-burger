import React, {useRef} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import {updateActiveTab} from "../../services/actions/burger-ingredients";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";


function BurgerIngredients(){

    const {categories, activeTab} = useAppSelector(store => store.burgerIngredients);

    const dispatch = useAppDispatch();

    const {ingredients} = useAppSelector(store => store.burgerIngredients);

    const refs = useRef<Array<HTMLHeadingElement|null>>([]);

    const setActiveTab = (value:string, index: number) => {
        dispatch(updateActiveTab(value));
        refs.current[index]?.scrollIntoView({ behavior: 'smooth'});
    }

    const handleScroll = (e:React.SyntheticEvent<HTMLElement>) =>{

        let offsetParent = e.currentTarget.getBoundingClientRect().top;

        const offsetChildren:number[] = refs.current.map((ref) => {
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
        <div  className={`${style.container}`}>
            <h1 className={"text_type_main-large mt-10"}>Соберите бургер</h1>
            <div style={{display: 'flex'}} className={"pt-5 pb-10"}>
                {Object.keys(categories).map((key, index) => {

                    return (
                        // @ts-ignore
                        <Tab value={key} key={key} active={activeTab === key} onClick={()=>{setActiveTab(key, index)}}>
                            {categories[key]}
                        </Tab>
                    )
                })}
            </div>
            <div onScroll={handleScroll} className={style.content}>
                {
                    !!ingredients.length &&
                    Object.keys(categories).map((key, index) => {
                        return (
                            <section key={index}>
                                <h3 ref={el => refs.current[index] = el} data-value={key} className={`text_type_main-medium`}>{categories[key]}</h3>
                                <div className={`${style.section} pt-6 pl-4 pr-4 pb-2`}>
                                    {ingredients.filter(({type}) => type === key).map((ingredient, index) => {
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