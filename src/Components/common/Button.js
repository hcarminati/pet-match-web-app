import React from "react";
import { Link } from "react-router-dom";
import './Button.css';

const Button = ({ linkTo, nameClass, text, onClickHandler = () => {}}) => {
    return (
        <Link to={linkTo} className={`${nameClass}`}
              onClick={onClickHandler}>
            {text}
        </Link>
    );
};

export default Button;
