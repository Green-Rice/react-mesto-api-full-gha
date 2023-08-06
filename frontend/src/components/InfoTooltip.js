import React from "react";
import advance from '../images/tick.png';
import fiasco from '../images/cross.png';


function InfoTooltip(props) {
    // console.log(advance)
    const isLegal = props.isLegal

    return (
        <div className={`popup popup_type_infotooltip ${props.isOpen && 'popup_is-opened'}`}>
            <div className="popup__content">
                <button type="button" className="popup__close" onClick={props.onClose} ></button>
                <img
                className="popup__baner"
                src={isLegal ? advance : fiasco}
                alt={isLegal ? 'advance' : 'fiasco'}
                />
                <h2 className="popup__title_tooltip">{isLegal? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    )
}
export default InfoTooltip;