import React from 'react';
import './index.css';
import {Navigate, Routes} from "react-router";
import AdminNavigation from "./AdminNavigation";
import {Route} from "react-router-dom";
import Users from "./Users";
import AdminEdit from "./AdminEdit";
import PublicProfile from "../Profile/PublicProfile";
import AddPets from "./AddPets";
import AvailablePets from "./AvailablePets";


const Admin = () => {
    return (
        <div className="admin-container">
            <div className="admin-content">
                <div className="ms-4 mt-4">
                    <div className="d-flex">
                        <AdminNavigation/>
                        <div className="courses-content-container flex-grow-1">
                            <Routes>
                                <Route path="/" element={<Navigate to="/Admin/add"/>} />
                                <Route path="add" element={<AddPets/>}/>
                                <Route path="users" element={<Users/>}/>
                                <Route path="users/:id" element={<PublicProfile/>}/>
                                <Route path="users/edit/:id" element={<AdminEdit/>}/>
                                <Route path="available" element={<AvailablePets/>}/>
                                {/*<Route path="Adopted" element={<h1>Adopted</h1>}/>*/}
                                {/*<Route path="Favorites" element={<h1>Favorites</h1>}/>*/}
                                {/*<Route path="/Settings/*" element={<Settings />} />*/}
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
