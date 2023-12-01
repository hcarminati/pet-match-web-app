import React from "react";
import {Routes, Route, Navigate, HashRouter} from "react-router-dom";
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
import Upload from "./Components/Upload";
import AdminPetProfile from "./Components/PetProfile/AdminPetProfile";

function App() {
    return (
        <HashRouter>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" />} />
                    <Route path="/Home" element={<HomePage />} />
                    <Route path="/Quiz" element={<Quiz />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Signup />} />
                    <Route path="/Search" element={<Search />} />
                    <Route path="/Profile/*" element={
                        <PrivateRoute element={<Profile />}
                                      roles={["ADMIN", "UPLOADER", "ADOPTER"]}/>
                    } />
                    <Route path="/Admin/*" element={
                        <PrivateRoute element={<Admin />} role={"ADMIN"} /> } />
                    <Route path="/Upload/*" element={
                        <PrivateRoute element={<Upload />} role={"UPLOADER"} /> } />
                    <Route path="/Pet/:id" element={<PetProfile />} />
                    <Route path="/user/profile/:id" element={<PublicProfile />} />

                    <Route path="/Unauthorized" element={<Unauthorized />} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
