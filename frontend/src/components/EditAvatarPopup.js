import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    useEffect(() => {
        inputAvatarRef.current.value =''
    },[props.isOpen])

    const inputAvatarRef = useRef()

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateAvatar({
            avatar: inputAvatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            name="avatar"
            title="Обновить аватар"
            submit="Сохранить">

            <div className="popup__container">
                <input id="avatar-link"
                    name="link"
                    className="popup__input popup__input_type_link"
                    type="url"
                    placeholder="Ссылка на изображение"
                    required
                    ref={inputAvatarRef} />
                <span className="popup__input-error avatar-link-error"></span>
            </div>
        </PopupWithForm>
    )
}
export default EditAvatarPopup