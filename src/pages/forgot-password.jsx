import React, {useCallback, useState} from 'react';
import styles from './login.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, register} from "../services/actions/user";
import {getCookie} from "../services/utils";

export function ForgotPasswordPage() {

    const [form, setValue] = useState({ email: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();
    const {user, forgotPasswordFailed, forgotPasswordSuccess} = useSelector(state => state.user);

    let forgotPasswordClick = useCallback(
        e => {
            e.preventDefault();
            dispatch(forgotPassword(form));
            setValue({email: ''});
        },
        [form]
    );

    const history = useHistory();
    if(forgotPasswordSuccess){
        return (
            <Redirect
                to={{
                    pathname: '/reset-password',
                    state: { from: '/forgot-password' }
                }}
            />
        );
    }

    if(user.email || getCookie("refreshToken") !== undefined){
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    return (
        <div className={`${styles.wrapper} pt-30 mt-15`}>
            <div className={`${styles.container}`}>
                <p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
                <div className="mb-6">
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                {forgotPasswordFailed && (
                    <p className={`text mb-6 text_type_main-default `}>ОЙ, Возникла ошибка!</p>
                )}
                <Button onClick={forgotPasswordClick} type="primary" size="large">
                    Восстановить
                </Button>

                <p className={`text mt-20 text_type_main-default text_color_inactive`}>Вспомнили пароль?  <Link to={{ pathname: `/login`, state: history.location.state }} className={`text_color_accent`}>Войти</Link></p>
            </div>
        </div>
    );
}