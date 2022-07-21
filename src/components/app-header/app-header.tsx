import React from "react";
import appHeaderStyles from './app-header.module.css';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink} from "react-router-dom";

function AppHeader() {
    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.wrapper}>
                <nav>
                    <ul className={appHeaderStyles.menu}>
                        <li>
                            <div className={`${appHeaderStyles.menuItem} ${appHeaderStyles.active}`}>
                                <BurgerIcon type={"primary"}/>
                                <NavLink
                                    exact
                                    to={{pathname: '/'}}
                                    className={`${appHeaderStyles.menuItemText} text_color_inactive`}
                                    activeClassName={appHeaderStyles.activeLink}
                                >Конструктор</NavLink>
                            </div>
                        </li>
                        <li>
                            <div className={appHeaderStyles.menuItem}>
                                <ListIcon type={"secondary"}/>
                                <NavLink
                                    exact
                                    to={{pathname: '/feed'}}
                                    className={`${appHeaderStyles.menuItemText} text_color_inactive`}
                                    activeClassName={appHeaderStyles.activeLink}
                                >Лента заказов</NavLink>
                            </div>
                        </li>
                    </ul>
                </nav>

                <Logo/>

                <div className={appHeaderStyles.menuItemLast}>
                    <ProfileIcon type={"secondary"}/>
                    <NavLink
                        to={{pathname: '/profile'}}
                        className={`${appHeaderStyles.menuItemText} text_color_inactive`}
                        activeClassName={appHeaderStyles.activeLink}
                    >Личный кабинет</NavLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;