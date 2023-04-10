import axios from "axios";

const registerNewUser = (email, password) => {
    return  axios.post('http://localhost:8080/register', {
        email,
        password
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
    })
    .then((response) => {
        return response.data
    }).catch((error) => {
        console.log({error})
    });
}

export {registerNewUser, authLoginUser}