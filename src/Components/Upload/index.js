import React from 'react';
import './index.css';
import {Navigate, Routes} from "react-router";
import {Route} from "react-router-dom";
import UploadNavigation from "./UploadNavigation";
import NewPet from "./NewPet";

const Admin = () => {
    return (
        <div className="uploader-container">
            <div className="uploader-content">
                <div className="ms-4 mt-4">
                    <div className="d-flex">
                        <UploadNavigation/>
                        <div className="courses-content-container flex-grow-1">
                            <Routes>
                                <Route path="/" element={<Navigate to="/Upload/add"/>}/>
                                <Route path="add" element={<NewPet/>}/>
                                <Route path="uploads" element={<h5>Upload</h5>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
