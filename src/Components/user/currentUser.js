import {useEffect, useState} from "react";
import * as profileClient from "../Profile/client";
import {setUser} from "../Profile/userReducer";
import {useDispatch} from "react-redux";

export function CurrentUser({children}) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const fetchCurrentUser = async () => {
        const userData = await profileClient.getAccount();
        dispatch(setUser(userData));
        setLoading(false);
    }

    useEffect(() => {
        fetchCurrentUser();
    });

    return (<>{!loading && children}</>);
}