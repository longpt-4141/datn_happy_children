import React from 'react';
import { useState, useEffect } from 'react';
import { getUserAccount } from '../services/userService';
const UserContext =  React.createContext({})

const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        username:'',
        email:'',
        role: {},
        accessToken:'',
        auth: null,
        isLoading: true
    }
    )
    console.log({user})

    const login = (userData) => {
        console.log('long')
        setUser({
            username: userData.username,
            email:userData.email,
            role: userData.role,
            accessToken:userData.accessToken,
            auth: true,
            isLoading: false
        });
    };
    
      // Logout updates the user data to default
    const logout = () => {
        setUser({
            username:'',
            email:'',
            role: {},
            accessToken:'',
            auth: false
        });
    };
    console.log({user})
    const fetchUser = async () => {
        console.log('long')
        let data = await getUserAccount();
        console.log({data})
        if(data && data.EC === 'ACCOUNT_VALID') {
            console.log('awn')
            const dataRes = data.DT
            setUser({
                email:dataRes.email,
                role: dataRes.role,
                accessToken: dataRes.accessToken,
                auth: true,
                username:dataRes.username,
                isLoading: false
        })
        }else if(data.EC === 'ERR_NOT_LOGGED-IN') {
            setUser({
                ...user,
                auth: false,
            })
        }
        console.log(user)
    }
    useEffect(() => {
        fetchUser()
    }, []);
    return (
        <UserContext.Provider
            value={{ user, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
}

export  {UserProvider, UserContext};
