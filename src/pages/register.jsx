import React, {useCallback, useState} from 'react';
import styles from './login.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../services/actions/user";


export function RegisterPage() {

    const [form, setValue] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const {user, registerFailed} = useSelector(state => state.user);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let registerClick = useCallback(
        e => {
            e.preventDefault();
            dispatch(register(form));
            setValue({name: '', email: '', password: ''});
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
                <p className={`text text_type_main-medium mb-6`}>Регистрация</p>
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
                {registerFailed && (
                    <p className={`text mb-6 text_type_main-default `}>При регистрации возникла ошибка!</p>
                )}
                <Button onClick={registerClick} type="primary" size="large">
                    Зарегистрироваться
                </Button>
                <p className={`text mt-20 text_type_main-default text_color_inactive`}>Уже зарегистрировались?  <Link to={{ pathname: `/login`, state: history.location.state }} className={`text_color_accent`}>Войти</Link></p>
            </div>
        </div>
    );
}