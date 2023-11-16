import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setUser } from "../Profile/userReducer";
import "./index.css";
import * as client from "./client";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("adopter"); // Default to "adopter"
    const [referralCode, setReferralCode] = useState("");
    const [error, setError] = useState(null);
    const [signedUp, setSignedUp] = useState(false);

    const dispatch = useDispatch();

    function handleSignup(e) {
        e.preventDefault();

        if (!email || !username || !password || !userType) {
            setError("Please fill in all required fields.");
            return;
        }

        let validReferralCodes = {
            admin: "123Admin",
        };

        if (userType === "admin" && referralCode !== validReferralCodes.admin) {
            setError("Invalid referral code for admin.");
            return;
        }

        const user = { email, username, password, userType, referralCode };

        client.register(user)
            .then((userData) => {
                dispatch({ type: "LOGIN_SUCCESS", payload: userData });
                dispatch(setUser(user));
                dispatch(login(user));
                setError("");
                setSignedUp(true);
            })
            .catch((err) => {
                setError("Email or password already exists. Please try again.");
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
                                     id="adopter"
                                     name="userType"
                                     value="adopter"
                                     checked={userType === "adopter"}
                                     onChange={() => setUserType("adopter")}
                                     className="form-check-input"
                                 />
                                 <label htmlFor="adopter" className="form-check-label">
                                     Adopter
                                 </label>
                             </div>
                             <div className="form-check">
                                 <input
                                     type="radio"
                                     id="uploader"
                                     name="userType"
                                     value="uploader"
                                     checked={userType === "uploader"}
                                     onChange={() => setUserType("uploader")}
                                     className="form-check-input"
                                 />
                                 <label htmlFor="uploader" className="form-check-label">
                                     Uploader
                                 </label>
                             </div>
                             <div className="form-check">
                                 <input
                                     type="radio"
                                     id="admin"
                                     name="userType"
                                     value="admin"
                                     checked={userType === "admin"}
                                     onChange={() => setUserType("admin")}
                                     className="form-check-input"
                                 />
                                 <label htmlFor="admin" className="form-check-label">
                                     Admin
                                 </label>
                             </div>
                         </div>
                         {userType !== "adopter" && userType !== "uploader" && (
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
