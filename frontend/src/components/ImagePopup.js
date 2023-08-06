import React from "react";
const ImagePopup = ({ card, onClose }) => {
  const checkIsOpen = card.isOpen
    ? "popup popup_type_review popup_is-opened"
    : "popup popup_type_review";

  return (
    <div className={checkIsOpen} >
      <div className="popup__view">
        <button type="button" className="popup__close" onClick={onClose} ></button>
        <img
          className="popup__img"
          src={card.item.link}
          alt={card.item.name}
        />
        <h3 className="popup__description">{card.item.name}</h3>
      </div>
    </div >
  )
}
export default ImagePopup