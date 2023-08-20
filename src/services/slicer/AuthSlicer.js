import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { authLoginUser, changeAvatarService, changePassWordService, getUserAccount, getUserRole } from '../userService';
import { toastError, toastSuccess } from '../../utils/toast-popup';

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

export const checkRoleByToken = createAsyncThunk('auth/checkRoleByToken', async (token) => {
    const res = await getUserRole(token);
    return res;
})

export const changePassWord = createAsyncThunk('auth/changePassWord', async ({password_data}) => {
    const res = await changePassWordService(password_data)
    return res
})

export const changeAvatar= createAsyncThunk('auth/changeAvatar', async ({change_avatar_request_data}) => {
    const res = await changeAvatarService(change_avatar_request_data)
    return res
})

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        message:{
            text: '',
            code: ''
        },
        user: {},
        token: '',
        isLoading: true,
        isLoggedIn: null,
        centerId: '',
        roleId: ''
    },
    reducers: {
        setCredentials: (state, action) => {
            console.log('payload',action.payload)
            state.user = action.payload.DT;
            state.token = action.payload.DT.accessToken;
            state.centerId = action.payload.DT.centerId;
            state.isLoggedIn = true;
            state.roleId = action.payload.DT.role.id;
        },
        logOut : (state, action) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = null;
            state.centerId= '';
            state.roleId= '';
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
                    console.log('ddd',action.payload.DT )
                    state.message.text = action.payload.EM;
                    state.message.code = action.payload.EC;
                    state.user = action.payload.DT;
                    state.token = action.payload.DT.accessToken;
                    state.centerId = action.payload.DT.centerId;
                    state.isLoggedIn = true;
                    state.roleId = action.payload.DT.role.id;
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
                if(action.payload.DT) {
                    console.log('ddd2')
                    state.user = action.payload.DT;
                    state.token = action.payload.DT.accessToken;
                    state.centerId = action.payload.DT.centerId;
                    state.isLoggedIn = true;
                    state.roleId = action.payload.DT.role.id;
                }
                else {
                    console.log('ccc2')
                }
            })
            .addCase(checkRoleByToken.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(checkRoleByToken.fulfilled, (state, action) => {
                state.isLoading = false;
                if(action.payload.DT) {
                    console.log('role')
                }
                else {
                    console.log('role fail')
                }
            })
            .addCase(changePassWord.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(changePassWord.fulfilled, (state, action) => {
                state.isLoading = false;
                switch (action.payload.EC) {
                    case "SUCCESS_CHANGE_PASSWORD":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    case "ERR_PASSWORD_WRONG":
                        // console.log('thanh cong');
                        toastError(action.payload.EM)
                        break;
                    default:
                        toastError('Có lỗi, vui lòng thử lại')
                        break;
                }
            })
            .addCase(changeAvatar.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(changeAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                switch (action.payload.EC) {
                    case "SUCCESS_CHANGE_AVATAR":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Có lỗi, vui lòng thử lại')
                        break;
                }
            })
    }

})

export const selectCurrentUser = (state) => state.auth.user
export const selectCenterId = (state) => state.auth.centerId
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentStatus = (state) => state.auth.isLoading
export const selectLoginMessage = (state) => state.auth.message
export const selectLoginData = (state) => state.auth
export const selectUserRole = (state) => state.auth.roleId

export default AuthSlice;
