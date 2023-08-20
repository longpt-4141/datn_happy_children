import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

axios.defaults.withCredentials = true;
const registerNewUser = async (representativeData, center_info) => {
    try {
        const response = await axios.post(`${baseUrl}/register`, {
            representativeData, center_info
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
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

const changePassWordService = async (password_data) => {
    try {
        const response = await axios.put(`${baseUrl}/change-password`, {password_data}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

const changeAvatarService = async (change_avatar_request_data) => {
    try {
        const response = await axios.put(`${baseUrl}/users/change-avatar`, {change_avatar_request_data}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export {registerNewUser, authLoginUser,getUserAccount, getUserRole, changePassWordService, changeAvatarService}