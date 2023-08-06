import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Header from "./Header";

function Register(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onRegisre({ email, password });
    }

    return (

        <>
            <Header>
                {<Link to='/sign-in' className="header__out" style={{color: '#fff'}}>Войти</Link>}
            </Header>

            <div className="auth">
                <div className="auth__container">

                    <h1 className="auth__title">Регистрация</h1>

                    <form className="auth__form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="auth__input"
                            name='email'
                            required
                            value={email}
                            onChange={event => setEmail(event.target.value)} />

                        <span className="popup__input-error" />

                        <input
                            type="password"
                            placeholder="Пароль"
                            className="auth__input"
                            name="password"
                            required
                            value={password}
                            onChange={event => setPassword(event.target.value)} />

                        <span className="popup__input-error" />
                        <button className="auth__btn" type="submit">Зарегистрироваться</button>
                    </form>
                    <p className="auth__subtitle">Уже зарегистрированы? <Link to="/sign-in" className="auth__login-link">Войти</Link></p>
                </div>
            </div>
        </>
    )
}
export default Register;