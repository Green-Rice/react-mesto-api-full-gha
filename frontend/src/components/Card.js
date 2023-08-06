import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;  // Определяем, являемся ли мы владельцем текущей карточки

  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);// Определяем, есть ли у карточки лайк, поставленный текущим пользователем

  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked && 'element__like-btn_active'}`// Создаём переменную, которую после зададим в `className` для кнопки лайка
  );

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  }

  const handleClickImg = () => {
    props.onCardClick({
      isOpen: true,
      item: props.card,
    });
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card)
  }

  return (
    <article className="element">
      <img className="element__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClickImg}
      />
      {isOwn && <button className='element__trash element__trash_active' onClick={handleDeleteClick} />}
      <div className="element__description">
        <h2 className="element__caption">{props.card.name}</h2>
        <div className="element__counter">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className="element__count">{props.card.likes.length}</div>
        </div>
      </div>
    </article>
  )
}
export default Card;