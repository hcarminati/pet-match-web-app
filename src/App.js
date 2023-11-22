import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/common/Header";
import HomePage from "./Components/Home";
import Quiz from "./Components/Quiz";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Search from "./Components/Search";
import Profile from "./Components/Profile";
import PetProfile from "./Components/PetProfile";
import Admin from "./Components/Admin";
import PrivateRoute from "./Components/PrivateRoutes";
import Unauthorized from "./Components/Unauthorized";
import PublicProfile from "./Components/Profile/PublicProfile";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" />} />
                    <Route path="/Home" element={<HomePage />} />
                    <Route path="/Quiz" element={<Quiz />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Signup />} />
                    <Route path="/Search" element={<Search />} />
                    <Route path="/Profile/*" element={<Profile />} />
                    <Route path="/Admin/*" element={
                        <PrivateRoute element={<Admin />} /> } />
                    <Route path="/Pet/:id" element={<PetProfile />} />
                    <Route path="/user/:id" element={<PublicProfile />} />

                    <Route path="/Unauthorized" element={<Unauthorized />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
