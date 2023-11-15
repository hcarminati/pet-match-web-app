import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setUser } from "../Profile/userReducer";
import "./index.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [error, setError] = useState(null);
    const [signedUp, setSignedUp] = useState(false); // Track whether the sign-up is successful

    const dispatch = useDispatch();

    function handleSignup(e) {
        e.preventDefault();

        let userType = "guest";

        if (referralCode === "123Admin") {
            userType = "admin";
        } else if (referralCode === "456Adopt") {
            userType = "adopter";
        } else if (referralCode === "789Casual") {
            userType = "casual";
        } else {
            setError("Invalid referral code. Please enter a valid code.");
            return; // Don't proceed with sign-up
        }

        const user = { username, password, userType };
        dispatch(setUser(user));
        dispatch(login(user));
        setError(""); // Clear any previous error message

        // Set the signedUp state to true to trigger the success message
        setSignedUp(true);
    }

    return (
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz content-center mb-3">Sign Up</p>

                {/* Conditional rendering based on the signedUp state */}
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
                             {error && <p className="text-danger">{error}</p>}
                         </div>
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
