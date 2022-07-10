import React from 'react';
import DoneIcon from "../../images/done.png";
import style from "./order-details.module.css"
import {useAppSelector} from "../../hooks/hooks";


function OrderDetails() {

    const {order, orderRequest} = useAppSelector(store => store.orderDetails);

    return (
        <>
            {orderRequest ? (
                <p className={"text_type_main-medium"}> Отправка запроса </p>
            ) : (
                <>
                    {order && order.number ? (
                            <>
                                <p className={`${style.orderNumber} text_type_digits-large mt-10`}>{order.number}</p>
                                <p className={"text_type_main-medium"}>идентификатор заказа</p>
                                <img className={`${style.doneIcon} mt-15 mb-15`} src={DoneIcon} alt="done"/>
                                <p className={"text_type_main-default mb-2"}>Ваш заказ начали готовить</p>
                                <p className={"text_type_main-default text_color_inactive mb-15"}>Дождитесь готовности на
                                    орбитальной станции</p>
                            </>
                        ) :
                        <p className={"text_type_main-medium"}> Возникла ошибка, обратитесь к администратору </p>
                    }
                </>
            )}
        </>
    );
}


export default OrderDetails;