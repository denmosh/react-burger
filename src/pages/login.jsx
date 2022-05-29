import React, {useState} from 'react';
import styles from './login.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";

export function LoginPage() {
    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const history = useHistory();
    return (
        <div className={`${styles.wrapper} pt-30 mt-15`}>
            <div className={`${styles.container}`}>
                <p className={`text text_type_main-medium mb-6`}>Вход</p>
                <div className="mb-6">
                    <EmailInput onChange={onChange} size={undefined} value={form.email} name={'email'} />
                </div>
                <div className="mb-6">
                    <PasswordInput onChange={onChange} value={form.password} name={'password'} />
                </div>
                <Button type="primary" size="large">
                    Войти
                </Button>
                <p className={`text mt-20 text_type_main-default text_color_inactive`}>Вы — новый пользователь?  <Link to={{ pathname: `/register`, state: history.location.state }} className={`text_color_accent`}>Зарегистрироваться</Link></p>
                <p className={`text mt-4 text_type_main-default text_color_inactive`}>Забыли пароль? <Link to={{ pathname: `/forgot-password`, state: history.location.state }} className={`text_color_accent`}>Восстановить пароль</Link></p>
            </div>

        </div>
    );
}