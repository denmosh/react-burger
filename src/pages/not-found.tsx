import React from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found.module.css';


export function NotFound404() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Ой! Ошибка 404</h1>
                    <p>Такой страницы не существует.</p>
                    <br />
                    <br />
                    <p>Проверьте адрес или перейдите на <Link to='/' className={styles.link}>Главную</Link></p>
                </div>
            </div>
        </div>
    );
}