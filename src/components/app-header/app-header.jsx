import React from "react";
import appHeaderStyles from './app-header.module.css';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={appHeaderStyles.header}>
            <div className={appHeaderStyles.wrapper}>
                <nav>
                    <ul className={appHeaderStyles.menu}>
                        <li>
                            <div className={`${appHeaderStyles.menuItem} ${appHeaderStyles.active}`}>
                                <BurgerIcon type={"primary"}/>
                                <span
                                    className={`${appHeaderStyles.menuItemText} text_color_primary`}>Конструктор</span>
                            </div>
                        </li>
                        <li>
                            <div className={appHeaderStyles.menuItem}>
                                <ListIcon type={"secondary"}/>
                                <span
                                    className={`${appHeaderStyles.menuItemText} text_color_inactive`}>Лента заказов</span>
                            </div>
                        </li>
                    </ul>
                </nav>

                <Logo/>

                <div className={appHeaderStyles.menuItemLast}>
                    <ProfileIcon type={"secondary"}/>
                    <span className={`${appHeaderStyles.menuItemText} text_color_inactive`}>Личный кабинет</span>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;