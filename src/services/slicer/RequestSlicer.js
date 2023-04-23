import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { authLoginUser, getUserAccount } from '../userService';
import { selectCurrentToken } from './AuthSlicer';
import { useSelector } from 'react-redux';

// export const checkAuthUser = createAsyncThunk('auth/login', async (userData) => {
//     const res = await authLoginUser(userData);
//     // const data = await res.json();
//     console.log(res);
//     return res;
// })

// export const checkAccessToken = createAsyncThunk('auth/checkAccessToken', async (token) => {
//     const res = await getUserAccount(token);
//     return res;
// })

// const token = useSelector(selectCurrentToken)

const RequestSlice = createSlice({
    name: 'requests',
    initialState: {
        message:{
            text: '',
            code: ''
        },
        request: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken} = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        login : (state, action) => {},

        logOut : (state, action) => {
            state.user = null;
            state.token = null;
        },
        testCheck : (state, action) => {
            state.requests = 'long'
        }
    },
    

})


export default RequestSlice;

export const selectRequestData = (state) => state.requests