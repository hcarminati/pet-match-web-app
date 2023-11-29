import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, role }) => {
    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
    const userRole = useSelector((state) => state.userReducer.role);

    return (
        isLoggedIn ? (
            userRole === role ? element : <Navigate to="/Home" />
        ) : <Navigate to="/Register" />
    );
};

export default PrivateRoute;