import React from 'react';
import { useContext, useEffect} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import useBeforeRender from '../utils/useBeforeRender';
import { UserContext } from '../context/UserProvider';
import { useSelector } from 'react-redux';
import { selectLoginData } from '../services/slicer/AuthSlicer';
// import SyncLoader from "react-spinners/SyncLoader";


const PrivateRoute = ({children, ...rest}) => {
    const loginData = useSelector(selectLoginData)
    // const [token, setToken] = useState(false)
    // const {user} = useContext(UserContext)
    // useBeforeRender(() => {
    //     console.log('auth data', user.auth)
    //     if(user && user.token) {
    //         console.log("data",user.token )
    //         if(user.auth === true) {
    //             setToken(true)
    //         }
    //     }
    //     else{
    //         setToken(false)
    //     }
    // }, [user]);
    // console.log({token})
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
