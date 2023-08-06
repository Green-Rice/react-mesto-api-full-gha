import React from "react";
import logo from '../images/Vector.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип-сайта" />
            <div className="header__content">
                {props.children}
            </div>
        </header>
    )
}
export default Header;
// /* <h2 className="header__user">{props.emailUser}</h2> */
//                 // <button className="header__out">Выйти</button>