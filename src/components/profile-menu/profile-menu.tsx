import React, {useCallback} from 'react';
import styles from "../../pages/profile.module.css";
import {NavLink} from "react-router-dom";
import {logout} from "../../services/actions/user";
import {getCookie} from "../../services/utils";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

function ProfileMenu() {

    const {user, logoutFailed} = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();
    const onClickLogout = useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(logout({token: getCookie('refreshToken')}));
        },
        [user]
    );

    return (
        <div className={`pt-30 mt-15`}>
            <section className={`${styles.nav} mr-15`}>
                <nav>
                    <ul>
                        <li className={`pt-4 pb-4 text text_type_main-medium `}>
                            <NavLink
                                exact
                                to={{ pathname: `/profile` }}
                                className={`text_color_inactive`}
                                activeClassName={styles.activeLink}
                            >Профиль</NavLink>
                        </li>
                        <li className={`pt-4 pb-4 text text_type_main-medium ${styles.borderTopNone}`}>
                            <NavLink
                                exact
                                to={{ pathname: `/profile/orders` }}
                                className={`text_color_inactive`}
                                activeClassName={styles.activeLink}
                            >История заказов</NavLink>
                        </li>
                        <li className={`pt-4 pb-4 text text_type_main-medium ${styles.borderTopNone}`}>
                                <span
                                    className={`${styles.logout} text_color_inactive`}
                                    onClick={onClickLogout}
                                >Выход</span>
                            {logoutFailed && (
                                <p className={`text mb-6 text_type_main-default `}>При выходе возникла ошибка, пожалуйста, попробуйте позже.</p>
                            )}
                        </li>
                    </ul>
                </nav>
                <div className={`mt-20 `}>
                    <p className={`text_color_inactive text_type_main-default ${styles.navInfo}`}>В этом разделе вы можете
                        изменить свои персональные данные</p>
                </div>
            </section>
        </div>
    );
}

export default ProfileMenu;