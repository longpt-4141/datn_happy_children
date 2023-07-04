import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

axios.defaults.withCredentials = true;
const registerNewUser = (email, password) => {
    return  axios.post(`${baseUrl}/register`, {
        email,
        password
    },{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    })
    .then((response) => {
        return response.data
    }).catch((error) => {
        console.log({error})
    });
}

const authLoginUser = (userData) => {
    return  axios.post(`${baseUrl}/login`, {
        userData
    }, {
        withCredentials: true,
    })
    .then((response) => {
        console.log(response.data);
        return response.data
    }).catch((error) => {
        console.log({error})
    });
}

const getUserAccount = async (token) => {
    try {
        const response = await axios.post(`${baseUrl}/account`, {token}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

const getUserRole = async (token) => {
    try {
        const response = await axios.post(`${baseUrl}/getRole`, {token}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export {registerNewUser, authLoginUser,getUserAccount, getUserRole}