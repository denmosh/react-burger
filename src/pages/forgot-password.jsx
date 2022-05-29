import React, {useState} from 'react';
import styles from './login.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";

export function ForgotPasswordPage() {

    const [form, setValue] = useState({ email: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const history = useHistory();
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
                <Button type="primary" size="large">
                    Восстановить
                </Button>

                <p className={`text mt-20 text_type_main-default text_color_inactive`}>Вспомнили пароль?  <Link to={{ pathname: `/login`, state: history.location.state }} className={`text_color_accent`}>Войти</Link></p>
            </div>
        </div>
    );
}