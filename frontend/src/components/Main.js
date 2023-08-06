import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Header from "./Header";

const Main = ({
  onEditProfile,
  onEditAvatar,
  onCardDelete,
  onCardClick,
  onCardLike,
  onAddPlace,
  emailUser,
  onLogOut,
  onClose,
  cards
}) => {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header>
        {<h2 className="header__user">{emailUser}</h2>}
        {<button type='button'className="header__out" onClick={onLogOut}>Выйти</button>}
      </Header>

      <main className="content">
        <section className="profile">
          <button
            type="button"
            className="button profile__avatar-changes"
            onClick={onEditAvatar}>

            <img className="profile__img" src={currentUser.avatar} alt={currentUser.name} />
          </button>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                onClick={onEditProfile}
                type="button">
              </button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>

          <button
            className="profile__add-button"
            onClick={onAddPlace}
            type="button">
          </button>
        </section>

        <section className="elements">
          {cards.map((card) => (
            <Card
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onClose={onClose}
              key={card._id}
              card={card} />
          ))}
        </section>
      </main>
    </>
  )
}
export default Main;