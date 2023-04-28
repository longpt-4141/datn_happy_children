import React from 'react';
import { useEffect} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoginData } from '../services/slicer/AuthSlicer';


const PrivateRoute = ({children, ...rest}) => {
    const loginData = useSelector(selectLoginData)
    useEffect(() => {
        
    })
    return (
        <>  {
                (loginData.isLoggedIn === true)  ? <Outlet/> : <Navigate to="/login" />
            }
        </>
    );
}

export default PrivateRoute;
