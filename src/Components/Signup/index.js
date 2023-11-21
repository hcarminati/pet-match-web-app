import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setUser } from "../Profile/userReducer";
import "./index.css";
import * as client from "./client";
import {signin} from "./client";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("ADOPTER"); // Default to "adopter"
    const [referralCode, setReferralCode] = useState("");
    const [error, setError] = useState(null);
    const [signedUp, setSignedUp] = useState(false);

    const dispatch = useDispatch();

    function handleSignup(e) {
        e.preventDefault();

        if (!email || !username || !password || !role) {
            setError("Please fill in all required fields.");
            return;
        }

        let validReferralCodes = {
            ADMIN: "123Admin",
        };

        if (role === "ADMIN" && referralCode !== validReferralCodes.ADMIN) {
            setError("Invalid referral code for admin.");
            return;
        }

        const user = { email, username, password, role,
            firstName: "", lastName: "", dob: ""};

        client.signup(user)
            .then((userData) => {
                dispatch({ type: "LOGIN_SUCCESS", payload: userData });
                dispatch(setUser(user));
                dispatch(login(user));
                setError("");
                setSignedUp(true);
            })
            .catch((err) => {
                setError("Email or username already exists. Please try again.");
            });


    }

    return (
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz content-center mb-3">Sign Up</p>

                {signedUp ? (
                    <div>
                        <p className="text-success">Sign-up successful!</p>
                        <p>You can now navigate to the profile page.</p>
                    </div>
                ) : (
                     <form className="pet-match-quiz mx-auto">
                         <div className="form-group">
                             <label htmlFor="email" className="form-label">
                                 Email
                             </label>
                             <input
                                 type="text"
                                 className="search-bar form-control me-2"
                                 id="email"
                                 placeholder="Enter your email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                             />
                         </div>
                         <div className="form-group">
                             <label htmlFor="username" className="form-label mt-1">
                                 Username
                             </label>
                             <input
                                 type="text"
                                 className="search-bar form-control me-2"
                                 id="username"
                                 placeholder="Enter your username"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
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
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                             />
                         </div>
                         <div className="form-group">
                             <label className="form-label mt-1">User Type</label>
                             <div className="form-check">
                                 <input
                                     type="radio"
                                     id="ADOPTER"
                                     name="role"
                                     value="ADOPTER"
                                     checked={role === "ADOPTER"}
                                     onChange={() => setRole("ADOPTER")}
                                     className="form-check-input"
                                 />
                                 <label htmlFor="adopter" className="form-check-label">
                                     Adopter
                                 </label>
                             </div>
                             <div className="form-check">
                                 <input
                                     type="radio"
                                     id="UPLOADER"
                                     name="role"
                                     value="UPLOADER"
                                     checked={role === "UPLOADER"}
                                     onChange={() => setRole("UPLOADER")}
                                     className="form-check-input"
                                 />
                                 <label htmlFor="uploader" className="form-check-label">
                                     Uploader
                                 </label>
                             </div>
                             <div className="form-check">
                                 <input
                                     type="radio"
                                     id="ADMIN"
                                     name="role"
                                     value="ADMIN"
                                     checked={role === "ADMIN"}
                                     onChange={() => setRole("ADMIN")}
                                     className="form-check-input"
                                 />
                                 <label htmlFor="admin" className="form-check-label">
                                     Admin
                                 </label>
                             </div>
                         </div>
                         {role !== "ADOPTER" && role !== "UPLOADER" && (
                             <div className="form-group">
                                 <label htmlFor="referralCode" className="form-label mt-1">
                                     Referral Code
                                 </label>
                                 <input
                                     type="text"
                                     className="search-bar form-control me-2"
                                     id="referralCode"
                                     placeholder="Enter your referral code"
                                     value={referralCode}
                                     onChange={(e) => setReferralCode(e.target.value)}
                                 />
                             </div>
                         )}
                         {error && <p className="text-danger">{error}</p>}
                         <div className="form-group">
                             <div className="float-end mb-2">
                                 <button
                                     onClick={(e) => handleSignup(e)}
                                     className="btn btn-secondary mt-2"
                                 >
                                     Sign Up
                                 </button>
                             </div>
                         </div>
                     </form>
                 )}
            </div>
        </div>
    );
}

export default Signup;
