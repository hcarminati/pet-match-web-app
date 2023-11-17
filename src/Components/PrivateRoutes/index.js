import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

    return (
        // isLoggedIn ? element : <Navigate to="/Unauthorized" />
        isLoggedIn ? element : <Navigate to="/Register" />
    );
};

export default PrivateRoute;