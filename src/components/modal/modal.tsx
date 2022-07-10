import React, {ReactNode, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modals") as HTMLElement;

function Modal(props:{
    onClose: ()=>void,
    children: ReactNode,
    title?: string
}) {

    useEffect(() => {
        function onKeyup(e: KeyboardEvent) {
            if (e.key === "Escape") props.onClose();
        }
        window.addEventListener("keyup", onKeyup);
        return () => window.removeEventListener("keyup", onKeyup);
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={`${styles.modal} pl-10 pr-10 pt-15 pb-15`}>
                <div className={`${styles.modalHeader} `}>
                    <div>
                    {props.title &&
                        <h3 className={"text_type_main-large"}>{props.title}</h3>
                    }
                    </div>
                    <button onClick={props.onClose} className={styles.close}>
                        <CloseIcon type={"primary"} />
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {props.children}
                </div>
            </div>
            <ModalOverlay onClose={props.onClose}/>
        </>,
        modalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string
}

export default Modal;