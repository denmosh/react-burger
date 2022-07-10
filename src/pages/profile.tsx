import React, {useCallback, useEffect, useState} from 'react';
import styles from './profile.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useHistory} from "react-router-dom";
import {getUser, logout, updateUser} from "../services/actions/user";
import {getCookie} from "../services/utils";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

export function ProfilePage() {
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const dispatch = useAppDispatch();

    const {user, updateUserFailed, logoutFailed} = useAppSelector(state => state.user);

    useEffect(()=> {
        if(user.email === ''){
            dispatch(getUser());
        }
    }, [])

    useEffect(()=> {
        setValue({...form, ...user})
    }, [user])

    const onChange = (e: React.ChangeEvent & { target: HTMLInputElement }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClickCancel = useCallback(
        (e:React.SyntheticEvent) => {
            e.preventDefault();
            setValue({ ...user, password: '' });
        },
        [form]
    );

    const onSubmit = useCallback(
        (e:React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(updateUser(form));
        },
        [form, user]
    );

    const onClickLogout = useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(logout({token: getCookie('refreshToken')}));
        },
        [form, user]
    );

    const history = useHistory();

    const buttonCancel = (
        // @ts-ignore
        <Button htmlType={"button"} onClick={onClickCancel} type="secondary" size="large">
            Отмена
        </Button>
    );
    const buttonSave = (
        // @ts-ignore
    <Button htmlType={"submit"} type="primary" size="large">
        Сохранить
    </Button>
    );
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
                    <form action="" onSubmit={onSubmit}>
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
                        {buttonCancel}
                        <span className={`m-4`}></span>
                        {buttonSave}
                    </form>
                </section>
            </div>
        </div>
    );
}