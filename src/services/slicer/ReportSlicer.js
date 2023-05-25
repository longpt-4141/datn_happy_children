import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../utils/toast-popup';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { acceptOrRejectReportServices, createReportServices, deleteReportServices, getAllReportsServices, getSpecificReportServices, updateReportServices} from '../reportService';
import dayjs from 'dayjs';


export const createNewReport = createAsyncThunk('report/createNewReport', async ({reportData, requestId}) => {
    const res = await createReportServices(reportData, requestId);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const getAllReports = createAsyncThunk('report/getAllReports', async ({currentRole, centerId}) => {
    const res = await getAllReportsServices(currentRole, centerId);
    console.log(res);
    return res;
})

// get specific report

export const getSpecificReport = createAsyncThunk('report/getSpecificReport', async (reportId) => {
    const res = await getSpecificReportServices(reportId);
    console.log(res);
    return res;
})
// update report 
export const updateReport = createAsyncThunk('report/updateReport', async ({reportId, reportData}) => {
    const res = await updateReportServices(reportId, reportData);
    console.log(res);
    return res;
})

//delete report
export const deleteReport = createAsyncThunk('report/deleteReport', async (reportId) => {
    const res = await deleteReportServices(reportId);
    return res
})

// update accept report 
export const acceptOrRejectReport = createAsyncThunk('report/acceptOrRejectReport', async ({reportId, actionData, currentRole}) => {
    const res = await acceptOrRejectReportServices(reportId, actionData, currentRole);
    console.log(res);
    return res;
})

const ReportSlice = createSlice({
    name: 'reports',
    initialState: {
        requestData: {},
        reportItem:{},
        reportData: [],
        note_reject: '',
        note_agree: '',
        message: {},
        ReportLoading: true,
        filteredReports: [],
    },
    reducers: {
        filterByStatus : (state, action) => {
            console.log(action.payload)

            const searchFiltered = state.reportData.filter(report => {
                const centerName = report.request.center ?  removeVietnameseTones(report.request.center.name).toLowerCase() : null;
                if(action.payload.searchText === null || action.payload.searchText === undefined || centerName === null) {
                    return true
                } else
                {
                    return centerName.includes(action.payload.searchText)
                }
            })

            const statusFiltered = searchFiltered.filter((report) => {
                if (action.payload.reportStatus === null || action.payload.reportStatus === undefined) {
                    return true
                }
                else return report.status === action.payload.reportStatus
            })
            return {
                ...state,
                filteredReports :statusFiltered
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createNewReport.pending, (state, action) => {
                state.ReportLoading = true;
            })
            .addCase(createNewReport.fulfilled, (state, action) => {
                console.log('action payload',action.payload);
                state.message = action.payload
                // const responseMessage = action.payload
                switch (action.payload.EC) {
                    case "SUCCESS_CREATE_NEW_REPORT":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    case "ERR_CREATE_NEW_REPORT":
                        toastError(action.payload.EM)
                        break;
                    case "ERR_CREATE_NEW_RECEIPT":
                        toastError(action.payload.EM)
                        break;
                    case "ERR_REPORT_MUST_UNIQUE":
                        toastError(action.payload.EM)
                            break;
                    default:
                        break;
                }
                state.ReportLoading = false;
                 //lay data tu server
            })
            .addCase(getAllReports.pending, (state, action) => {
                state.ReportLoading = true;
            })
            .addCase(getAllReports.fulfilled, (state, action) => {
                console.log('action payload',action.payload);
                // state.message = action.payload
                // const responseMessage = action.payload
                state.reportData = action.payload
                // state.filteredReports = action.payload 
                state.ReportLoading = false;
                 //lay data tu server
            })
            //get specific report
            .addCase(getSpecificReport.pending, (state, action) => {
                state.ReportLoading = true;
            })
            .addCase(getSpecificReport.fulfilled, (state, action) => {
                console.log(action.payload);
                state.reportItem = action.payload;
                state.requestData = action.payload.request
                state.ReportLoading = false;
                 //lay data tu server
            })
            //delete case
            .addCase(deleteReport.pending, (state, action) => {
                state.ReportLoading = true;
            })
            .addCase(deleteReport.fulfilled, (state, action) => {
                console.log('delete case',action.payload);
                const {
                    arg
                } = action.meta;
                console.log('delete case',arg);
                state.ReportLoading = false;
                state.message = action.payload;
                state.reportData.splice(state.reportData.findIndex((arrow) => arrow.id === arg), 1);
                switch (action.payload.EC) {
                    case "DELETE_REPORT_SUCCESS":
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Xóa không thành công vui lòng tải lại trang và thực hiện lại!')
                        break;
                }
                 //lay data tu server
            })
            .addCase(updateReport.pending, (state, action) => {
                state.ReportLoading = true;
            })
            .addCase(updateReport.fulfilled, (state, action) => {
                console.log(action.payload);
                state.ReportLoading = false;
            })
            // accept or reject report 
            .addCase(acceptOrRejectReport.pending, (state, action) => {
                state.ReportLoading = true;
            })
            .addCase(acceptOrRejectReport.fulfilled, (state, action) => {
                console.log(action.payload);
                const response = action.payload
                switch (response.EC) {
                    case 'SUCCESS_ACCEPT_REPORT':
                        state.reportItem.status = action.payload.DT.status
                        toastSuccess(response.EM)
                        break;
                    case 'SUCCESS_REJECT_REPORT':
                        state.reportItem.status = action.payload.DT.status
                        state.reportItem.note_reject = action.payload.DT.note_reject;
                        toastSuccess(response.EM)
                        break;
                    default:
                        toastError('có lỗi xảy ra vui lòng tải lại trang và thử lại')
                        break;
                }
                state.ReportLoading = false;
            })
    }
    

});

export const selectReportData = (state) => {
    return state.reports.reportData.map((row, index) => (
        {   
            key: row.id,
            id: row.id,
            stt: index +1,
            center_name: row.request.center ? row.request.center.name : null,
            // center_avatar: row.request.center.avatar ? row.request.center.n,
            request_description: row.request.description,
            total_money: row.request.total_money,
            createdAt: row.createdAt,
            status: row.status,
            total_pay_money: row.total_pay_money,
        }
    ))
    
}

export const selectFilteredReportData = (state) => {
    return state.reports.filteredReports.map((row, index) => (
        {   
            key: row.id,
            id: row.id,
            stt: index +1,
            center_name: row.request.center ? row.request.center.name : null,
            // center_avatar: row.request.center.avatar ? row.request.center.n,
            request_description: row.request.description,
            total_money: row.request.total_money,
            createdAt: row.createdAt,
            status: row.status,
            total_pay_money: row.total_pay_money,
        }
    ))
    
}

export const SelectReportItem = (state) => {
    return state.reports.reportItem;
}

export const SelectRequestDataFromReport = (state) => {
    return state.reports.requestData;
}

export const SelectReceiptData = state => {
    const receiptData = state.reports.reportItem.receipts ? state.reports.reportItem.receipts.map((receipt, index) => ({
        ...receipt,
        stt: index +1,
        key: receipt.id,
        pay_date :  dayjs(receipt.pay_date, 'YYYY-MM-DD') 
    })) : []

    return receiptData
}

export const SelectReportLoading = (state) => {
    return state.reports.ReportLoading
}

export default ReportSlice;
