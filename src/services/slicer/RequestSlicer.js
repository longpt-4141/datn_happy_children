import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { createRequestServices, getAllRequestServices, getSpecificRequestServices, updateStatusRequestServices ,deleteRequestServices, updateMoneyConfirmStatusServices } from '../requestService';
import { toastError, toastSuccess } from '../../utils/toast-popup';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { checkReportStatus } from '../../utils/checkReportStatus';
// import socketClient  from "socket.io-client";

export const getAllRequests = createAsyncThunk('requests/getAllRequests', async ({currentRole, centerId}) => {
    const res = await getAllRequestServices(currentRole, centerId);
    console.log(res);
    return res;
})

export const getSpecificRequest = createAsyncThunk('requests/getSpecificRequest', async (requestId) => {
    const res = await getSpecificRequestServices(requestId);
    console.log(res);
    return res;
})

export const updateStatusRequest = createAsyncThunk('requests/updateStatusRequest', async ({requestId,noteData}) => {
    console.log({noteData});
    const res = await updateStatusRequestServices(requestId,noteData);

    console.log('update status', res);
    return res;
})

//update confirm money
export const updateMoneyConfirmStatus = createAsyncThunk('requests/updateMoneyConfirmStatus', async ({requestId,noteData}) => {
    console.log({noteData});
    const res = await updateMoneyConfirmStatusServices(requestId, noteData);

    console.log('update status', res);
    return res;
})

//create new request
export const createNewRequest = createAsyncThunk('requests/createNewRequest', async ({requestData, navigate}) => {
    const res = await createRequestServices(requestData);
    navigate('/requests')
    console.log('create request', res);
    return res;
})

// delete request thunk
export const deleteRequest = createAsyncThunk('requests/deleteRequest', async (requestId) => {
    const res = await deleteRequestServices(requestId);
    console.log('delete request', res);
    return res;
})

const RequestSlice = createSlice({
    name: 'requests',
    initialState: {
        requestItem: {},
        requests: [],
        filteredRequests: [],
        isLoading : true,
        addLoading: true,
        centerData : {},
        centerAvatar: {},
        note_reject: '',
        note_agree: '',
        message: {}
    },
    reducers: {
         /* ===== FILTER ===== */
        filterByRequestType : (state, action) => {
            console.log(action.payload)
            const filtered = state.requests.filter((request) => {
                return request.type_request === action.payload
            })
            return {
                ...state,
                filteredRequests : action.payload !== undefined ? filtered : state.requests
            }
        },
        filterByStatus : (state, action) => {
            console.log(action.payload)

            const searchFiltered = state.requests.filter(request => {
                const centerName = removeVietnameseTones(request.center.name).toLowerCase();
                if(action.payload.searchText.length === 0 || action.payload.searchText === undefined ) {
                    return true
                } else
                {
                    return centerName.includes(action.payload.searchText)
                }
            })

            const typeFiltered = searchFiltered.filter((request) => {
                if (action.payload.requestType === null || action.payload.requestType === undefined) {
                    return true
                }
                else return request.type_request === action.payload.requestType
            })
            console.log({typeFiltered})

            const statusFiltered = typeFiltered.filter((request) => {
                if (action.payload.requestStatus === null || action.payload.requestStatus === undefined) {
                    return true
                }
                else if(action.payload.requestStatus === 4) {
                    return request.money_transfer_confirm === 1
                }
                else return request.status === action.payload.requestStatus
            })
            return {
                ...state,
                filteredRequests :statusFiltered
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllRequests.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllRequests.fulfilled, (state, action) => {
                console.log(action.payload);
                state.requests = action.payload;
                state.filteredRequests = action.payload;
                state.isLoading = false;
                 //lay data tu server
            })
            .addCase(getSpecificRequest.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getSpecificRequest.fulfilled, (state, action) => {
                console.log(action.payload);
                state.requestItem = action.payload;
                state.centerAvatar = action.payload.center.avatar
                state.centerData = action.payload.center
                switch (action.payload.status) {
                    case 2:
                        state.note_reject = action.payload.note_reject
                        break;
                    case 1:
                        state.note_agree = action.payload.note_agree
                        break;
                    default:
                        break;
                }
                state.isLoading = false;
                 //lay data tu server
            })
            .addCase(updateStatusRequest.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateStatusRequest.fulfilled, (state, action) => {
                console.log(action.payload);
                state.requestItem.status = action.payload.DT.status 
                if(action.payload.DT.status === 1) {
                    state.note_agree = action.payload.DT.note_agree 
                    state.requestItem.updatedAt = action.payload.DT.updatedAt
                    state.requestItem.money_transfer_confirm = 0
                } else if (action.payload.DT.status === 2) {
                    state.note_reject = action.payload.DT.note_reject
                    state.requestItem.updatedAt = action.payload.DT.updatedAt
                }
                state.isLoading = false;
                 //lay data tu server
            })
            .addCase(createNewRequest.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createNewRequest.fulfilled, (state, action) => {
                console.log(action.payload);
                state.message = action.payload;
                if (action.payload.EC === "SUCCESS_CREATE_NEW_REQUEST") {
                        // dispatch(getAllRequests())
                        // const SERVER = "http://127.0.0.1:8080";
                        // var socket = socketClient (SERVER);
                        // socket.emit('notification', {msg : 'long'});
                        // socket.on('notification', msg => {
                        //   console.log('>>>>>>>>>>>>>>>>>>', msg)
                        // });
                        toastSuccess(action.payload.EM)
                    } else {
                        toastError(action.payload.EM)
                    }
                state.isLoading = false;
                 //lay data tu server
            })
            //delete case
            .addCase(deleteRequest.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                console.log('delete case',action.payload);
                const {
                    arg: { id },
                  } = action.meta;
                state.isLoading = false;
                state.message = action.payload;
                state.requests.splice(state.requests.findIndex((arrow) => arrow.id === id), 1);
                switch (action.payload.EC) {
                    case "DELETE_REQUEST_SUCCESS":
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Xóa không thành công vui lòng tải lại trang và thực hiện lại!')
                        break;
                }
                 //lay data tu server
            })
            // update money confirm
            .addCase(updateMoneyConfirmStatus.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateMoneyConfirmStatus.fulfilled, (state, action) => {
                state.requestItem.money_transfer_confirm = action.payload.DT.money_transfer_confirm
                state.requestItem.updatedAt = action.payload.DT.updatedAt
                state.isLoading = false;
            })
    }
    

});

export const selectRequestData = (state) => {
    return state.requests.filteredRequests.map((row, index) => (
        {   
            key: row.id,
            id: row.id,
            stt: index +1,
            center_name: row.center.name,
            type_request: row.type_request,
            description: row.description,
            total_money: row.total_money,
            createdAt: row.createdAt,
            status: row.status,
            money_transfer_confirm: row.money_transfer_confirm,
            check_report_status : checkReportStatus(row.reports).status,
            report_id :  checkReportStatus(row.reports).id ? checkReportStatus(row.reports).id : null,
        }
    ))
    
}
export const selectRequestItem = (state) => {
    console.log(state.requests.requestItem)
    return {
        ...state.requests.requestItem,
        // center : {
        //     ...state.requests.requestItem,
        //     avatar : arrayBufferToBase64(state.requests.requestItem.center.avatar)
        // }
    };
}
export const selectCenterAvatar = (state) => {
    console.log(state.requests.centerAvatar)
    return state.requests.centerAvatar
}

export const selectCenterData = (state) => {
    console.log(state.requests.centerData)
    return state.requests.centerData
}

export const selectRejectNote = (state) => {
    return state.requests.note_reject
}

export const selectAgreeNote = (state) => {
    return state.requests.note_agree
}

export const selectIsLoading = (state) => {
    return state.requests.isLoading
}

export const selectAddLoading = (state) => {
    return state.requests.addLoading
}

export const selectMessage = (state) => {
    return state.requests.message
}

export default RequestSlice;
