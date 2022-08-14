import React, {useRef} from 'react';
import style from './constructor-item.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {moveIngredient} from "../../services/actions/burger-constructor";
import PropTypes from "prop-types";
import ingredientPropTypes from "../../constants/ingredient-prop-types";
import {IIngredient, IIngredientUniq} from "../../services/interfaces/interfaces";
import {useAppDispatch} from "../../hooks/hooks";


function ConstructorItem(props:{ingredient: IIngredientUniq, index: number, handleRemoveItem:(uuid:string)=>void}) {
    const {ingredient, handleRemoveItem, index} = props;

    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<IIngredient & {index:number}, unknown, {handlerId:string | symbol | null}>({
        accept: "constructor-item",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset? clientOffset.y - hoverBoundingRect.top: 0;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(moveIngredient({from: dragIndex, to: hoverIndex}));
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "constructor-item",
        item: {...ingredient, index: index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0.8 : 1
    drag(drop(ref))

    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className={`${style.wrapper} mr-4`}>
            <DragIcon type={"primary"}/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={() => handleRemoveItem(ingredient.uuid)}
            />
        </div>
    );
}

ConstructorItem.propTypes = {
    handleRemoveItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    ingredient: ingredientPropTypes
}

export default ConstructorItem;