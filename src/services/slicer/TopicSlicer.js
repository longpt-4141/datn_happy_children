import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../utils/toast-popup';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { createNewTopicService, deleteTopicService, editTopicService, getAllTopicsService, getSpecificTopicService } from '../topicService';


export const createNewTopic = createAsyncThunk('topics/createNewTopic', async ({topicData}) => {
    const res = await createNewTopicService(topicData);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const getAllTopics =  createAsyncThunk('topics/getAllTopics', async () => {
    const res = await getAllTopicsService();
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const getSpecificTopic =  createAsyncThunk('topics/getSpecificTopic', async ({id}) => {
    const res = await getSpecificTopicService(id);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const editTopic =  createAsyncThunk('topics/editTopic', async ({id, topicData}) => {
    const res = await editTopicService(id, topicData);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const deleteTopic =  createAsyncThunk('topics/deleteTopic', async ({topicId}) => {
    const res = await deleteTopicService(topicId);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})



const TopicSlicer = createSlice({
    name: 'topics',
    initialState: {
        topicsData : [],
        topicItem:{},
        message: {},
        TopicLoading: true,
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
            .addCase(createNewTopic.pending, (state, action) => {
                state.TopicLoading = true;
            })
            .addCase(createNewTopic.fulfilled, (state, action) => {
                console.log('action payload',action.payload);
                state.message = action.payload
                // const responseMessage = action.payload
                switch (action.payload.EC) {
                    case "SUCCESS_CREATE_NEW_TOPIC":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Tạo chủ đề không thành công, vui lòng thử lại')
                        break;
                }
                state.TopicLoading = false;
                 //lay data tu server
            })
            .addCase(getAllTopics.pending, (state, action) => {
                state.TopicLoading = true;
            })
            .addCase(getAllTopics.fulfilled, (state, action) => {
                console.log('getAllTopics', action.payload);
                state.topicsData = action.payload
                state.TopicLoading = false;
                //lay data tu server
            })
            .addCase(getSpecificTopic.pending, (state, action) => {
                state.TopicLoading = true;
            })
            .addCase(getSpecificTopic.fulfilled, (state, action) => {
                console.log('getSpecificTopic', action.payload);
                state.topicItem = action.payload
                state.TopicLoading = false;
                //lay data tu server
            })
            .addCase(editTopic.pending, (state, action) => {
                state.TopicLoading = true;
            })
            .addCase(editTopic.fulfilled, (state, action) => {
                console.log('editTopic', action.payload);
                // state.topicItem = action.payload
                switch (action.payload.EC) {
                    case "SUCCESS_EDIT_FUND":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Cập nhật không thành công, vui lòng thử lại')
                        break;
                }
                state.TopicLoading = false;
                //lay data tu server
            })
            .addCase(deleteTopic.pending, (state, action) => {
                state.TopicLoading = true;
            })
            .addCase(deleteTopic.fulfilled, (state, action) => {
                console.log('deleteTopic', action.payload);
                // state.topicItem = action.payload
                switch (action.payload.EC) {
                    case "SUCCESS_DELETE_FUND":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Xóa không thành công, vui lòng thử lại')
                        break;
                }
                state.TopicLoading = false;
                //lay data tu server
            })
            
    }
    

});

export const selectAllTopics = (state, action) => {
    return state.topics.topicsData.map((row, index) => (
        {   
            key: row.id,
            id: row.id,
            stt: index + 1,
            name: row.name,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        }
    ))
}

export const selectTopicLoading = (state, action) => {
    return state.topics.TopicLoading
}

export const selectTopicItem = (state, action) => {
    return state.topics.topicItem
}

export default TopicSlicer;
