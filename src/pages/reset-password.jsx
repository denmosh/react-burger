import React, {useCallback, useState} from 'react';
import styles from './login.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, resetPassword} from "../services/actions/user";

export function ResetPasswordPage() {

    const [form, setValue] = useState({ password: '', token: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();
    const {resetPasswordFailed, resetPasswordSuccess} = useSelector(state => state.user);

    let resetPasswordClick = useCallback(
        e => {
            e.preventDefault();
            dispatch(resetPassword(form));
            setValue({password: '', token: ''});
        },
        [form]
    );

    const history = useHistory();

    if(resetPasswordSuccess){
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }

    return (
        <div className={`${styles.wrapper} pt-30 mt-15`}>
            <div className={`${styles.container}`}>
                <p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>

                <div className="mb-6">
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>
                <div className="mb-6">
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onChange}
                        value={form.token}
                        name={'token'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                {resetPasswordFailed && (
                    <p className={`text mb-6 text_type_main-default `}>ОЙ, Возникла ошибка!</p>
                )}
                <Button onClick={resetPasswordClick} type="primary" size="large">
                    Сохранить
                </Button>

                <p className={`text mt-20 text_type_main-default text_color_inactive`}>Вспомнили пароль?  <Link to={{ pathname: `/login`, state: history.location.state }} className={`text_color_accent`}>Войти</Link></p>
            </div>
        </div>
    );
}