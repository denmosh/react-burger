import React, {useState} from 'react';
import styles from './profile.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, NavLink, useHistory} from "react-router-dom";

export function ProfilePage() {
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const history = useHistory();
    return (
        <div className={`${styles.wrapper} pt-30 mt-15`}>
            <div className={`${styles.container}`}>
                <section className={`${styles.nav} mr-15`}>
                    <nav>
                        <ul>
                            <li className={`pt-4 pb-4 text text_type_main-medium  ${styles.borderDashedAccent}`}>
                                <NavLink
                                    exact
                                    to={{ pathname: `/profile` }}
                                    className={`text_color_inactive`}
                                    activeClassName={styles.activeLink}
                                >Профиль</NavLink>
                            </li>
                            <li className={`pt-4 pb-4 text text_type_main-medium ${styles.borderTopNone} ${styles.borderDashedAccent}`}>
                                <NavLink
                                    exact
                                    to={{ pathname: `/profile/orders` }}
                                    className={`text_color_inactive`}
                                    activeClassName={styles.activeLink}
                                >История заказов</NavLink>
                            </li>
                            <li className={`pt-4 pb-4 text text_type_main-medium ${styles.borderTopNone} ${styles.borderDashedAccent}`}>
                                <NavLink
                                    exact
                                    to={{ pathname: `/logout` }}
                                    className={`text_color_inactive`}
                                    activeClassName={styles.activeLink}
                                >Выход</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={`mt-20 ${styles.borderDashedAccent}`}>
                        <p className={`text_color_inactive text_type_main-default ${styles.navInfo}`}>В этом разделе вы можете
                            изменить свои персональные данные</p>
                    </div>

                </section>
                <section>
                    <div className="mb-6">
                        <Input
                            type={'text'}
                            placeholder={'Иия'}
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
                </section>

            </div>
        </div>
    );
}