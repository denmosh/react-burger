import React, {useCallback, useState} from 'react';
import styles from './login.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {login} from "../services/actions/user";
import {getCookie} from "../services/utils";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

export function LoginPage() {
    const [form, setValue] = useState({ email: '', password: '' });

    const { state }:{state:null|{from: string}} = useLocation();
    const onChange = (e: React.ChangeEvent & { target: HTMLInputElement }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const dispatch = useAppDispatch();
    const {user, loginFailed} = useAppSelector(state => state.user);

    let onSubmit = useCallback(
        (e:React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(login(form));
            setValue({ email: '', password: ''});
        },
        [form]
    );

    const history = useHistory();
    if(user.email || getCookie("refreshToken") !== undefined){
        return (
            <Redirect
                to={ state?.from || '/' }
            />
        );
    }

    const button = (
        // @ts-ignore
        <Button htmlType={"submit"} type="primary" size="large">
            Войти
        </Button>
    );
    return (
        <div className={`${styles.wrapper} pt-30 mt-15`}>
            <div className={`${styles.container}`}>
                <form action="" onSubmit={onSubmit}>
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
                    {button}
                    <p className={`text mt-20 text_type_main-default text_color_inactive`}>Вы — новый пользователь?  <Link to={{ pathname: `/register`, state: history.location.state }} className={`text_color_accent`}>Зарегистрироваться</Link></p>
                    <p className={`text mt-4 text_type_main-default text_color_inactive`}>Забыли пароль? <Link to={{ pathname: `/forgot-password`, state: history.location.state }} className={`text_color_accent`}>Восстановить пароль</Link></p>

                </form>
             </div>

        </div>
    );
}