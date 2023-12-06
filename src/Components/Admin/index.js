import React from 'react';
import './index.css';
import {Navigate, Routes} from "react-router";
import AdminNavigation from "./AdminNavigation";
import {Link, Route} from "react-router-dom";
import Users from "./Users";
import AdminEdit from "./AdminEdit";
import PublicProfile from "../Profile/PublicProfile";
import AddPets from "./AddPets";
import AvailablePets from "./AvailablePets";
import AdminPetProfile from "../PetProfile/AdminPetProfile";
import AdoptionCenters from "./AdoptionCenters";

const Admin = () => {
    return (
        <div className="admin-container">
            <div className="admin-content">
                <div className="ms-4 mt-4">
                    <div className="row">
                        <div className="col-12 col-sm-4 col-md-3 col-lg-2">
                                <AdminNavigation/>
                        </div>
                        <div className="pet-profile-top-info col-12 col-sm-8 col-md-9 col-lg-10">
                            <div className="courses-content-container ">
                                <Routes>
                                    <Route path="/" element={<Navigate to="/Admin/add"/>}/>
                                    <Route path="add" element={<AddPets/>}/>
                                    <Route path="users" element={<Users/>}/>
                                    <Route path="users/:id" element={<PublicProfile/>}/>
                                    <Route path="users/edit/:id" element={<AdminEdit/>}/>
                                    <Route path="available" element={<AvailablePets/>}/>
                                    <Route path="pet/:id" element={<AdminPetProfile/>}/>
                                    <Route path="acenter" element={<AdoptionCenters/>}/>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
