import React, {useCallback, useEffect, useState} from 'react';
import styles from './profile.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink, useHistory} from "react-router-dom";
import {getUser, login, logout, updateUser} from "../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../services/utils";

export function ProfilePage() {
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const dispatch = useDispatch();

    const {user, updateUserFailed, logoutFailed} = useSelector(state => state.user);

    useEffect(()=> {
        if(user.email === ''){
            dispatch(getUser());
        }
    }, [])

    useEffect(()=> {
        setValue({...form, ...user})
    }, [user])

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClickCancel = useCallback(
        e => {
            e.preventDefault();
            setValue({ ...user, password: '' });
        },
        [form]
    );

    const onClickSave = useCallback(
        e => {
            e.preventDefault();
            dispatch(updateUser(form));
        },
        [form, user]
    );

    const onClickLogout = useCallback(
        e => {
            e.preventDefault();
            dispatch(logout({token: getCookie('refreshToken')}));
        },
        [form, user]
    );

    const history = useHistory();
    return (
        <div className={`${styles.wrapper} pt-30 mt-15`}>
            <div className={`${styles.container}`}>
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
                <section>
                    <div className="mb-6">
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChange}
                            value={form.name}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>
                    <div className="mb-6">
                        <EmailInput onChange={onChange} size={undefined} value={form.email} name={'email'} />
                    </div>
                    <div className="mb-6">
                        <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                    </div>
                    {updateUserFailed && (
                        <p className={`text mb-6 text_type_main-default `}>Ой, возникла ошибка!</p>
                    )}
                    <Button onClick={onClickCancel} type="secondary" size="large">
                        Отмена
                    </Button>
                    <span className={`m-4`}></span>
                    <Button onClick={onClickSave} type="primary" size="large">
                        Сохранить
                    </Button>
                </section>

            </div>
        </div>
    );
}