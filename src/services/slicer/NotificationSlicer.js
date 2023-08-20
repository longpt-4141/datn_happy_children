import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { getAllAdminRemindersService, getAllCenterRemindersService, getAllNotificationsService } from '../notificationService';

export const getAllNotifications = createAsyncThunk('requests/getAllNotifications', async ({currentRole,offset}) => {
    const res = await getAllNotificationsService(currentRole, offset);
    console.log(res);
    return res;
})

export const getAllCenterReminder = createAsyncThunk('requests/getAllCenterReminder', async ({centerId}) => {
    const res = await getAllCenterRemindersService(centerId);
    console.log(res);
    return res;
})

export const getAllAdminReminder = createAsyncThunk('requests/getAllAdminReminder', async () => {
    const res = await getAllAdminRemindersService();
    console.log(res);
    return res;
})

const NotificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        adminNotifications : [],
        centerNotifications : [],
        centerReminders : [],
        adminReminders : [],
        count : 0,
        remindLoading : true,
    },
    reducers: {
         /* ===== FILTER ===== */
    },
    extraReducers: builder => {
        builder
            .addCase(getAllNotifications.pending, (state, action) => {
                state.remindLoading = true;
            })
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
            .addCase(getAllCenterReminder.pending, (state, action) => {
                state.remindLoading = true;
            })
            .addCase(getAllCenterReminder.fulfilled, (state, action) => {
                console.log(action.payload);
                state.centerReminders = action.payload.rows
                state.remindLoading = false;

                 //lay data tu server
            })
            .addCase(getAllAdminReminder.pending, (state, action) => {
                state.remindLoading = true;
            })
            .addCase(getAllAdminReminder.fulfilled, (state, action) => {
                console.log(action.payload);
                state.adminReminders = action.payload.rows
                state.remindLoading = false;
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

export const selectCenterReminders = (state) => {
    return state.notifications.centerReminders
}

export const selectAdminReminders = (state) => {
    return state.notifications.adminReminders
}

export default NotificationSlice;
