import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../utils/toast-popup';
import { confirmDonationServices, confirmItemDonationServices, getAllFundDonatesServices, getAllItemDonatesServices, getAllNormalDonatesServices, rejectDonationServices, rejectItemDonationServices } from '../donateService';


export const getAllNormalDonates = createAsyncThunk('donate/getAllNormalDonates', async () => {
    const res = await getAllNormalDonatesServices();
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const getAllFundDonates = createAsyncThunk('donate/getAllFundDonates', async () => {
    const res = await getAllFundDonatesServices();
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const getAllItemDonates = createAsyncThunk('donate/getAllItemDonates', async () => {
    const res = await getAllItemDonatesServices();
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const confirmDonation = createAsyncThunk('donate/confirmDonation', async ({confirm_data}) => {
    const res = await confirmDonationServices(confirm_data);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const confirmItemDonation = createAsyncThunk('donate/confirmItemDonation', async ({confirm_data}) => {
    const res = await confirmItemDonationServices(confirm_data);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const rejectDonation = createAsyncThunk('donate/rejectDonation', async ({reject_data}) => {
    const res = await rejectDonationServices(reject_data);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const rejectItemDonation = createAsyncThunk('donate/rejectItemDonation', async ({reject_data}) => {
    const res = await rejectItemDonationServices(reject_data);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

const DonateSlicer = createSlice({
    name: 'donate',
    initialState: {
        normalDonateData: [],
        fundsDonateData : [],
        itemsDonateData: [],
        message: {},
        DonateLoading: true,
    },
    reducers: {
        // filterByStatus : (state, action) => {
        //     console.log(action.payload)

        //     const searchFiltered = state.reportData.filter(report => {
        //         const centerName = report.request.center ?  removeVietnameseTones(report.request.center.name).toLowerCase() : null;
        //         if(action.payload.searchText === null || action.payload.searchText === undefined || centerName === null) {
        //             return true
        //         } else
        //         {
        //             return centerName.includes(action.payload.searchText)
        //         }
        //     })

        //     const statusFiltered = searchFiltered.filter((report) => {
        //         if (action.payload.reportStatus === null || action.payload.reportStatus === undefined) {
        //             return true
        //         }
        //         else return report.status === action.payload.reportStatus
        //     })
        //     return {
        //         ...state,
        //         filteredReports :statusFiltered
        //     }
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllNormalDonates.pending, (state, action) => {
                state.DonateLoading = true;
            })
            .addCase(getAllNormalDonates.fulfilled, (state, action) => {
                console.log('getAllNormalDonates',action.payload);
                state.normalDonateData = action.payload.DT
                state.DonateLoading = false;
                //lay data tu server
            })
            .addCase(getAllFundDonates.pending, (state, action) => {
                state.DonateLoading = true;
            })
            .addCase(getAllFundDonates.fulfilled, (state, action) => {
                console.log('getAllFundDonates',action.payload);
                state.fundsDonateData = action.payload.DT
                state.DonateLoading = false;
                //lay data tu server
            })
            .addCase(getAllItemDonates.pending, (state, action) => {
                state.DonateLoading = true;
            })
            .addCase(getAllItemDonates.fulfilled, (state, action) => {
                console.log('getAllItemDonates',action.payload);
                state.itemsDonateData = action.payload.DT
                state.DonateLoading = false;
                //lay data tu server
            })
            .addCase(confirmDonation.pending, (state, action) => {
                state.DonateLoading = true;
            })
            .addCase(confirmDonation.fulfilled, (state, action) => {
                console.log('confirmDonation',action.payload);
                // state.normalDonateData = action.payload.DT;
                const responseData = action.payload.DT
                const donateType = action.payload.type
                if (donateType === 'donate/normal') {
                    let objIndex = state.normalDonateData.findIndex((obj => obj.id === responseData.id));
                    console.log('check 1: ', objIndex);

                    state.normalDonateData.splice(objIndex, 1);
                    console.log('check 2: ', state.normalDonateData);

                    state.normalDonateData.push(responseData)
                    console.log('check 3: ', state.normalDonateData);
                } else if (donateType === 'donate/fund') {
                    let objIndex = state.fundsDonateData.findIndex((obj => obj.id === responseData.id));
                    console.log('check 1: ', objIndex);

                    state.fundsDonateData.splice(objIndex, 1);
                    console.log('check 2: ', state.fundsDonateData);

                    state.fundsDonateData.push(responseData)
                    console.log('check 3: ', state.fundsDonateData);
                }
                //Log object to Console.
                console.log(action.payload.DT)
                const response = action.payload
                switch (response.EC) {
                    case 'SUCCESS_CONFIRM_TRANSACTION':
                        toastSuccess(response.EM)
                        break;
                    default:
                        toastError('có lỗi xảy ra vui lòng tải lại trang và thử lại')
                        break;
                }
                state.DonateLoading = false;
                //lay data tu server
            })
            .addCase(confirmItemDonation.pending, (state, action) => {
                state.DonateLoading = true;
            })
            .addCase(confirmItemDonation.fulfilled, (state, action) => {
                console.log('confirmItemDonation',action.payload);
                // state.normalDonateData = action.payload.DT;
                const responseData = action.payload.DT
                let objIndex = state.itemsDonateData.findIndex((obj => obj.id === responseData.id));
                console.log('check 1: ', objIndex);

                state.itemsDonateData.splice(objIndex, 1);
                console.log('check 2: ', state.itemsDonateData);

                state.itemsDonateData.push(responseData)
                console.log('check 3: ', state.itemsDonateData);

                //Log object to Console.
                console.log(action.payload.DT)
                const response = action.payload
                switch (response.EC) {
                    case 'SUCCESS_CONFIRM_TRANSACTION':
                        toastSuccess(response.EM)
                        break;
                    default:
                        toastError('có lỗi xảy ra vui lòng tải lại trang và thử lại')
                        break;
                }
                state.DonateLoading = false;
                //lay data tu server
            })
            /* REJECT DONATION */
            .addCase(rejectDonation.pending, (state, action) => {
                state.DonateLoading = true;
            })
            .addCase(rejectDonation.fulfilled, (state, action) => {
                console.log('rejectDonation',action.payload);
                // state.normalDonateData = action.payload.DT;
                const responseData = action.payload.DT
                const donateType = action.payload.type
                if (donateType === 'donate/normal') {
                    let objIndex = state.normalDonateData.findIndex((obj => obj.id === responseData.id));
                    console.log('check 1: ', objIndex);

                    state.normalDonateData.splice(objIndex, 1);
                    console.log('check 2: ', state.normalDonateData);

                    state.normalDonateData.push(responseData)
                    console.log('check 3: ', state.normalDonateData);
                } else if (donateType === 'donate/fund') {
                    let objIndex = state.fundsDonateData.findIndex((obj => obj.id === responseData.id));
                    console.log('check 1: ', objIndex);

                    state.fundsDonateData.splice(objIndex, 1);
                    console.log('check 2: ', state.fundsDonateData);

                    state.fundsDonateData.push(responseData)
                    console.log('check 3: ', state.fundsDonateData);
                }
                //Log object to Console.
                console.log(action.payload.DT)
                const response = action.payload
                switch (response.EC) {
                    case 'SUCCESS_REJECT_TRANSACTION':
                        toastSuccess(response.EM)
                        break;
                    default:
                        toastError('có lỗi xảy ra vui lòng tải lại trang và thử lại')
                        break;
                }
                state.DonateLoading = false;
                //lay data tu server
            })
            /* REJECT ITEM DONATION */
            .addCase(rejectItemDonation.pending, (state, action) => {
                state.DonateLoading = true;
            })
            .addCase(rejectItemDonation.fulfilled, (state, action) => {
                console.log('rejectItemDonation',action.payload);
                // state.normalDonateData = action.payload.DT;
                const responseData = action.payload.DT
                let objIndex = state.itemsDonateData.findIndex((obj => obj.id === responseData.id));
                console.log('check 1: ', objIndex);

                state.itemsDonateData.splice(objIndex, 1);
                console.log('check 2: ', state.itemsDonateData);

                state.itemsDonateData.push(responseData)
                console.log('check 3: ', state.itemsDonateData);

                //Log object to Console.
                console.log(action.payload.DT)
                const response = action.payload
                switch (response.EC) {
                    case 'SUCCESS_REJECT_TRANSACTION':
                        toastSuccess(response.EM)
                        break;
                    default:
                        toastError('có lỗi xảy ra vui lòng tải lại trang và thử lại')
                        break;
                }
                state.DonateLoading = false;
                //lay data tu server
            })
    }
    

});

export const selectAllNormalDonates = (state, action) => {
    return state.donate.normalDonateData.map((row, index) => (
        {   
            key: row.id,
            id: row.id,
            stt: index +1,
            username: row.username,
            email: row.email,
            address: row.address ? row.address : null,
            phone_number: row.phone_number ? row.phone_number : null,
            send_amount: row.send_amount,
            exact_amount: row.exact_amount,
            message: row.message ? row.message : null,
            createdAt: row.createdAt,
            status: row.status,
        }
    ))
}

export const selectAllFundDonates = (state, action) => {
    return state.donate.fundsDonateData.map((row, index) => (
        {   
            key: row.id,
            id: row.id,
            stt: index +1,
            username: row.username,
            email: row.email,
            address: row.address ? row.address : null,
            phone_number: row.phone_number ? row.phone_number : null,
            send_amount: row.send_amount,
            exact_amount: row.exact_amount,
            message: row.message ? row.message : null,
            createdAt: row.createdAt,
            status: row.status,
            // fund_name : row.fund.name
        }
    ))
}

export const selectAllItemDonates = (state, action) => {
    return state.donate.itemsDonateData.map((row, index) => (
        {   
            key: row.id,
            id: row.id,
            stt: index +1,
            username: row.username,
            email: row.email,
            address: row.address ? row.address : null,
            phone_number: row.phone_number ? row.phone_number : null,
            description: row.description ? row.description : null,
            createdAt: row.createdAt,
            status: row.status,
            fund_name : row.fund? row.fund.name : null
        }
    ))
}

export const selectDonateLoading = (state, action) => {
    return state.donate.DonateLoading
}


export default DonateSlicer;
