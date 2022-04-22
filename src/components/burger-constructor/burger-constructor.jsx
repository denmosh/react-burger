import React, {Component} from 'react';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
class BurgerConstructor extends Component {

    render() {
        return (
            <div className={` mt-25`}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {this.props.ingredients.map((ingredient)=>{
                        return(
                            <p></p>
                        )
                    })}
                    <div className="wrapper">
                        <DragIcon type={"primary"} />
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
                        />
                    </div>
    
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
                    />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02-mobile.png"}
                    />
                </div>
                <div>
                    <div className="price">
                        <span className="text_type_digits-medium">610</span>
                        <CurrencyIcon type={"primary"} />
                    </div>
                    <Button size={"large"} type={"primary"}>Оформить заказ</Button>
                </div>

           </div>
        );
    }
}

export default BurgerConstructor;