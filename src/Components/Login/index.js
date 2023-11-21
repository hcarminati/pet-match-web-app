import React, { useState } from "react";
import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import {login, setUser} from "../Profile/userReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as client from "./client";
import {getByUsername} from "./client";

function Login() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        // if (!username || !password) {
        //     setError("Please fill in all required fields.");
        //     return;
        // }

        await client.signin(credentials).then(async (userData) => {
                    dispatch({type: "LOGIN_SUCCESS", payload: userData});
                    setLoggedIn(true);
                    const user = await getByUsername(credentials.username);
                    dispatch(setUser(user));
                    dispatch(login(user));
                })
                .catch((err) => {
                    setError("Invalid username or password. Please try again.");
                });
        // client.checkCredentials(username, password)
        //     .then(async (userData) => {
        //         dispatch({type: "LOGIN_SUCCESS", payload: userData});
        //         setLoggedIn(true);
        //         const user = await getByUsername(username);
        //         dispatch(setUser(user));
        //         dispatch(login(user));
        //     })
        //     .catch((err) => {
        //         setError("Invalid username or password. Please try again.");
        //     });
        // await client.signin({username: username, password: password});
    }

    return (
        // <div className="content content-center">
        //     <h1>Signin</h1>
        //     <input value={credentials.username}
        //            onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
        //     <input value={credentials.password}
        //            onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
        //     <button onClick={signin}> Signin</button>
        // </div>
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz content-center mb-3">Login</p>
                {loggedIn ? (
                    <div>
                        <p className="text-success">Login successful!</p>
                        <p>You are now logged in.</p>
                    </div>
                ) : (
                <form className="pet-match-quiz mx-auto">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="search-bar form-control me-2"
                            id="username"
                            placeholder="Enter your username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label mt-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="search-bar form-control me-2"
                            id="password"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="form-group">
                        <div className="float-end mb-2">
                            <Link to={`/Home`} onClick={(e) => handleLogin(e)} className="btn btn-secondary mt-2">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
}

export default Login;
