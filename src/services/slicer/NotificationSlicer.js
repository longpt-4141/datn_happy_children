import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { getAllNotificationsService } from '../notificationService';

export const getAllNotifications = createAsyncThunk('requests/getAllNotifications', async ({currentRole,offset}) => {
    const res = await getAllNotificationsService(currentRole, offset);
    console.log(res);
    return res;
})

const NotificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        adminNotifications : [],
        centerNotifications : [],
        count : 0,
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
            // .addCase(getAllNotifications.pending, (state, action) => {
            //     state.isLoading = true;
            // }).0
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                console.log(action.payload);
                let rawNotifications = action.payload.rows;
                rawNotifications = rawNotifications.map((item) => ({
                    ...item,
                    data : JSON.parse(item.data)
                }))
                console.log({rawNotifications});
                state.adminNotifications = [
                    ...state.adminNotifications,
                    rawNotifications
                ];
                state.count = action.payload.count
                 //lay data tu server
            })
            
    }
    

});

// export const selectRequestData = (state) => {
//     return state.requests.filteredRequests.map((row, index) => (
//         {   
//             key: row.id,
//             id: row.id,
//             stt: index +1,
//             center_name: row.center.name,
//             type_request: row.type_request,
//             description: row.description,
//             total_money: row.total_money,
//             createdAt: row.createdAt,
//             status: row.status,
//             money_transfer_confirm: row.money_transfer_confirm,
//             check_report_status : checkReportStatus(row.reports).status,
//             report_id :  checkReportStatus(row.reports).id ? checkReportStatus(row.reports).id : null,
//         }
//     ))
    
// }
// export const selectRequestItem = (state) => {
//     console.log(state.requests.requestItem)
//     return {
//         ...state.requests.requestItem,
//         // center : {
//         //     ...state.requests.requestItem,
//         //     avatar : arrayBufferToBase64(state.requests.requestItem.center.avatar)
//         // }
//     };
// }
// export const selectCenterAvatar = (state) => {
//     console.log(state.requests.centerAvatar)
//     return state.requests.centerAvatar
// }

// export const selectCenterData = (state) => {
//     console.log(state.requests.centerData)
//     return state.requests.centerData
// }

// export const selectRejectNote = (state) => {
//     return state.requests.note_reject
// }

// export const selectAgreeNote = (state) => {
//     return state.requests.note_agree
// }

// export const selectIsLoading = (state) => {
//     return state.requests.isLoading
// }

// export const selectAddLoading = (state) => {
//     return state.requests.addLoading
// }

export const selectCountNotifications = (state) => {
    return state.notifications.count
}

export const selectAdminNotifications = (state) => {
    return state.notifications.adminNotifications
}


export default NotificationSlice;
