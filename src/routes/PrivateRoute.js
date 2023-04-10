import React from 'react';
import { useState} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useBeforeRender from '../utils/useBeforeRender';
const PrivateRoute = ({children, ...rest}) => {
    const [token, setToken] = useState(false)
    useBeforeRender(() => {
        const data = JSON.parse(sessionStorage.getItem("account"));
        if(data) {
            console.log("data",data.isAuthenticated )
            if(data.isAuthenticated === true) {
                setToken(true)
            }
        }
        else{
            setToken(false)
        }
    }, []);
    console.log({token})
    return (
        token ? <Outlet/> : <Navigate to="/login" />
    );
}

export default PrivateRoute;
