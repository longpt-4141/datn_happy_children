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

const authLoginUser = (email, password) => {
    return  axios.post('http://localhost:8080/login', {
        email,
        password
    }, {
        withCredentials: true,
    })
    .then((response) => {
        return response.data
    }).catch((error) => {
        console.log({error})
    });
}

const getUserAccount = () => {
    return axios.get('http://localhost:8080/account', {
        withCredentials: true,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log({error})
    });
}

export {registerNewUser, authLoginUser,getUserAccount}