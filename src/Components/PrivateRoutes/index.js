import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import * as profileClient from "../Profile/client";

const PrivateRoute = ({element, role, roles}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await profileClient.getAccount();
                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/Register"/>;
    }

    if (roles) {
        roles.map(role => {
                      if (user.role !== role) {
                          return <Navigate to="/Home"/>;
                      }
                      else {
                          return <></>;
                      }
                  }
        )
    }

    if (role && user.role !== role) {
        return <Navigate to="/Home"/>;
    }

    return element;
};

export default PrivateRoute;
