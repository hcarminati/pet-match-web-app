import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import Button from '../common/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faSearch, faUpload, faUser} from "@fortawesome/free-solid-svg-icons";
import * as profileClient from "../Profile/client";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);

    const isAdmin = user && user.role === 'ADMIN';
    const isUploader = user && user.role === 'UPLOADER';

    return (
        <div className="header">
            <div className="header-left">
                <Link to="/" className="header-logo">
                    Pet<span className="header-logo-highlight">Match</span>
                </Link>
            </div>
            <div className="header-right">
                {user.username ? (
                    <div className="d-flex">
                        <div className="col">
                            <Link to="/Search" className="text-muted me-3">
                                <FontAwesomeIcon icon={faSearch} size="lg"/>
                            </Link>
                        </div>
                        {isAdmin && (
                            <div className="col">
                                <Link to="/Admin" className="text-danger me-3">
                                    <FontAwesomeIcon icon={faCog} size="lg"/>
                                </Link>
                            </div>
                        )}
                        {isUploader && (
                            <div className="col">
                                <Link to="/Upload" className="text-danger me-3">
                                    <FontAwesomeIcon icon={faUpload} size="lg"/>
                                </Link>
                            </div>
                        )}
                        <div className="col">
                            <Link to="/Profile/Home" className="header-profile">
                                <FontAwesomeIcon icon={faUser} size="lg" />
                            </Link>
                        </div>
                    </div>
                ) : (
                     <>
                         <Button linkTo="/Login" nameClass="basic-button header-login-button me-2" text="Login" />
                         <Button linkTo="/Register" nameClass="basic-button pink-hover header-registration-button" text="Sign Up" />
                     </>
                 )}
            </div>
        </div>
    );
};

export default Header;

