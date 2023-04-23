import axios from "axios";

axios.defaults.withCredentials = true;
const registerNewUser = (email, password) => {
    return  axios.post('http://localhost:8080/register', {
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
    return  axios.post('http://localhost:8080/login', {
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

const getUserAccount = (token) => {
    return axios.get('http://localhost:8080/account', token,{
        withCredentials: true,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log({error})
    });
}

export {registerNewUser, authLoginUser,getUserAccount}