import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);

    const [description, setDescription] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen}
            title="Редактировать профиль"
            submit="Сохранить"
            name="edit">
            <>
                <input
                    className="popup__input popup__input_type_name "
                    value={name || ''}
                    placeholder="Имя"
                    name="user_name"
                    id="name-input"
                    maxLength="40"
                    minLength="2"
                    type="text"
                    required
                    onChange={event => setName(event.target.value)} />

                <span className="popup__input-error name-input-error"></span>

                <input
                    className="popup__input popup__input_type_description"
                    value={description || ''}
                    placeholder="О тебе"
                    name="biography"
                    maxLength="200"
                    id="bio-input"
                    minLength="2"
                    type="text"
                    required
                    onChange={event => setDescription(event.target.value)} />

                <span className="popup__input-error bio-input-error ">Необходимо заполнить пол</span>
            </>
        </PopupWithForm>
    )
}
export default EditProfilePopup;