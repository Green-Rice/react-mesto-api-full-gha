import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [namePlace, setNamePlace] = useState('')
    const [linkPlace, setLinkPlace] = useState('')

    useEffect(() => {
        setNamePlace('')
        setLinkPlace('')
    }, [props.isOpen])

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAddPlace({
            name: namePlace,
            link: linkPlace
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen}
            title="Новое место"
            submit="Создать"
            name="add"
        >

            <div className="popup__container">
                <input
                    className="popup__input popup__input_type_title"
                    placeholder="Название"
                    value={namePlace}
                    id="name-card"
                    maxLength="30"
                    minLength="2"
                    name="name"
                    type="text"
                    required
                    onChange={event => setNamePlace(event.target.value)}
                />
                <span className="popup__input-error name-card-error popup__input-error_active"></span>
            </div>

            <div className="popup__container">
                <input
                    className="popup__input popup__input_type_link"
                    placeholder="Ссылка на картинку"
                    value={linkPlace}
                    id="link-card"
                    name="link"
                    type="url"
                    required
                    onChange={event => setLinkPlace(event.target.value)}
                />
                <span className="popup__input-error link-card-error"></span>
            </div>

        </PopupWithForm>
    )
}
export default AddPlacePopup;