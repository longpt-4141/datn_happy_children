import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../utils/toast-popup';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { createNewFundService, deleteFundService, editFundService, getAllFundsService, getSpecificFundService } from '../fundService';


export const createNewFund = createAsyncThunk('funds/createNewFund', async ({fundData}) => {
    const res = await createNewFundService(fundData);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const getAllFunds =  createAsyncThunk('funds/getAllFunds', async () => {
    const res = await getAllFundsService();
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const getSpecificFund =  createAsyncThunk('funds/getSpecificFund', async ({id}) => {
    const res = await getSpecificFundService(id);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const editFund =  createAsyncThunk('funds/editFund', async ({id, fundData}) => {
    const res = await editFundService(id, fundData);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const deleteFund =  createAsyncThunk('funds/deleteFund', async ({fundId}) => {
    const res = await deleteFundService(fundId);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})



const FundSlicer = createSlice({
    name: 'funds',
    initialState: {
        fundsData : [],
        fundItem:{},
        message: {},
        FundLoading: true,
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
            .addCase(createNewFund.pending, (state, action) => {
                state.FundLoading = true;
            })
            .addCase(createNewFund.fulfilled, (state, action) => {
                console.log('action payload',action.payload);
                state.message = action.payload
                // const responseMessage = action.payload
                switch (action.payload.EC) {
                    case "SUCCESS_CREATE_NEW_FUND":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Tạo quỹ không thành công, vui lòng thử lại')
                        break;
                }
                state.FundLoading = false;
                 //lay data tu server
            })
            .addCase(getAllFunds.pending, (state, action) => {
                state.FundLoading = true;
            })
            .addCase(getAllFunds.fulfilled, (state, action) => {
                console.log('getAllFunds', action.payload);
                state.fundsData = action.payload
                state.FundLoading = false;
                //lay data tu server
            })
            .addCase(getSpecificFund.pending, (state, action) => {
                state.FundLoading = true;
            })
            .addCase(getSpecificFund.fulfilled, (state, action) => {
                console.log('getSpecificFund', action.payload);
                state.fundItem = action.payload
                state.FundLoading = false;
                //lay data tu server
            })
            .addCase(editFund.pending, (state, action) => {
                state.FundLoading = true;
            })
            .addCase(editFund.fulfilled, (state, action) => {
                console.log('editFund', action.payload);
                // state.fundItem = action.payload
                switch (action.payload.EC) {
                    case "SUCCESS_EDIT_FUND":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Cập nhật không thành công, vui lòng thử lại')
                        break;
                }
                state.FundLoading = false;
                //lay data tu server
            })
            .addCase(deleteFund.pending, (state, action) => {
                state.FundLoading = true;
            })
            .addCase(deleteFund.fulfilled, (state, action) => {
                console.log('deleteFund', action.payload);
                // state.fundItem = action.payload
                switch (action.payload.EC) {
                    case "SUCCESS_DELETE_FUND":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Xóa không thành công, vui lòng thử lại')
                        break;
                }
                state.FundLoading = false;
                //lay data tu server
            })
            
    }
    

});

export const selectAllFunds = (state, action) => {
    return state.funds.fundsData.map((row, index) => (
        {   
            key: row.id,
            id: row.id,
            stt: index + 1,
            name: row.name,
            description : row.description,
            sponsor_estimate_amount : row.sponsor_estimate_amount ? row.sponsor_estimate_amount : 'Không giới hạn',
            received_amount : row.received_amount ? row.received_amount : null,
            general_pay_amount : row.general_pay_amount ? row.general_pay_amount : null,
            end_at : row.end_at ? row.end_at : 'Vô thời hạn',
            start_at : row.start_at ,
            image_url : row.image_url ? row.image_url : null,
            report_file_url : row.report_file_url ? row.report_file_url : null,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            status: row.status,
        }
    ))
}

export const selectFundLoading = (state, action) => {
    return state.funds.FundLoading
}

export const selectFundItem = (state, action) => {
    return state.funds.fundItem
}

export default FundSlicer;
