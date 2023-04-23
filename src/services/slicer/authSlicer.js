import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { authLoginUser, getUserAccount } from '../userService';

export const checkAuthUser = createAsyncThunk('auth/login', async (userData) => {
    const res = await authLoginUser(userData);
    // const data = await res.json();
    console.log(res);
    return res;
})

export const checkAccessToken = createAsyncThunk('auth/checkAccessToken', async (token) => {
    const res = await getUserAccount(token);
    return res;
})

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        message:{
            text: '',
            code: ''
        },
        user: null,
        token: null,
        isLoading: true,
        isLoggedIn: null
    },
    reducers: {
        setCredentials: (state, action) => {
            console.log('payload',action.payload)
            state.user = action.payload.DT;
            state.token = action.payload.DT.accessToken;
            state.isLoggedIn = true;
        },
        login : (state, action) => {},

        logOut : (state, action) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: builder => {
        builder
            // .addCase(checkAuthUser.pending, (state, action) => {
            //     state.message.text = action.payload.EM;
            //     state.message.code = action.payload.EC;
            // })
            .addCase(checkAuthUser.fulfilled, (state, action) => {
                if(action.payload.DT) {
                    console.log('ddd')
                    state.message.text = action.payload.EM;
                    state.message.code = action.payload.EC;
                    state.user = action.payload.DT;
                    state.token = action.payload.DT.accessToken;
                    state.isLoggedIn = true;
                }
                else {
                    console.log('ccc')
                    state.message.text = action.payload.EM;
                    state.message.code = action.payload.EC;
                }
            })
            .addCase(checkAccessToken.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(checkAccessToken.fulfilled, (state, action) => {
                state.isLoading = false;
            })
    }

})


export default AuthSlice;

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentStatus = (state) => state.auth.isLoading
export const selectLoginMessage = (state) => state.auth.message
export const selectLoginData = (state) => state.auth