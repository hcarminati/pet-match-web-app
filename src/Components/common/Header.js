import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import Button from '../common/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

const Header = ({isLoggedIn}) => {
    return (
        <div className="header">
            <div className="header-left">
                <Link to="/" className="header-logo">
                    Pet<span className="header-logo-highlight">Match</span>
                </Link>
            </div>
            <div className="header-right">
                {false ? (
                    <Link to="/Profile" className="header-profile">
                        <FontAwesomeIcon icon={faUser}/>
                    </Link>
                ) : (
                     <>
                         <Button linkTo="/Login" nameClass="basic-button header-login-button me-2"
                                 text="Login"/>
                         <Button linkTo="/Register"
                                 nameClass="basic-button pink-hover header-registration-button"
                                 text="Sign Up"/>
                     </>
                 )}
            </div>
        </div>
    );
};

export default Header;
