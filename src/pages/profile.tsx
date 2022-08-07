import React, {useCallback, useEffect, useState} from 'react';
import styles from './profile.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUser, updateUser} from "../services/actions/user";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import ProfileMenu from "../components/profile-menu/profile-menu";

export function ProfilePage() {
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const dispatch = useAppDispatch();

    const {user, updateUserFailed} = useAppSelector(state => state.user);

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
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container}`}>
                <ProfileMenu/>
                <section className={`pt-30 mt-15`}>
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