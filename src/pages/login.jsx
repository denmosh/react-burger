import React, {useCallback, useState} from 'react';
import styles from './login.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../services/actions/user";

export function LoginPage() {
    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();
    const {user, loginFailed} = useSelector(state => state.user);

    let loginClick = useCallback(
        e => {
            e.preventDefault();
            dispatch(login(form));
            setValue({ email: '', password: ''});
        },
        [form]
    );

    const history = useHistory();
    if(user.email){
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
                <p className={`text text_type_main-medium mb-6`}>Вход</p>
                <div className="mb-6">
                    <Input
                        type={'email'}
                        placeholder={'Email'}
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className="mb-6">
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>
                {loginFailed && (
                    <p className={`text mb-6 text_type_main-default `}>Ой, возникла ошибка!</p>
                )}
                <Button onClick={loginClick} type="primary" size="large">
                    Войти
                </Button>
                <p className={`text mt-20 text_type_main-default text_color_inactive`}>Вы — новый пользователь?  <Link to={{ pathname: `/register`, state: history.location.state }} className={`text_color_accent`}>Зарегистрироваться</Link></p>
                <p className={`text mt-4 text_type_main-default text_color_inactive`}>Забыли пароль? <Link to={{ pathname: `/forgot-password`, state: history.location.state }} className={`text_color_accent`}>Восстановить пароль</Link></p>
            </div>

        </div>
    );
}