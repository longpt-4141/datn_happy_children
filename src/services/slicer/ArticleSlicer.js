import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../../utils/toast-popup';
import removeVietnameseTones from '../../utils/format/stringFomart';
import { createNewArticleService, getAllTopicAndFundsService , getAllArticlesService, getSpecificArticleService, editArticleService, confirmArticleStatusService, deleteArticleService} from '../articleService';


export const createNewArticle = createAsyncThunk('articles/createNewArticle', async ({articleData}) => {
    const res = await createNewArticleService(articleData);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const updateArticle = createAsyncThunk('articles/updateArticle', async ({id,articleData}) => {
    const res = await editArticleService(id,articleData);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

export const getAllTopicAndFunds = createAsyncThunk('articles/getAllTopicAndFund', async () => {
    const res = await getAllTopicAndFundsService();
    console.log(res);
    return res;
})

export const getAllArticles = createAsyncThunk('articles/getAllArticles', async (searchText) => {
    const res = await getAllArticlesService(searchText);
    console.log(res);
    return res;
})

export const getSpecificArticle = createAsyncThunk('articles/getSpecificArticle', async (articleId) => {
    const res = await getSpecificArticleService(articleId);
    console.log(res);
    return res;
})

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async ({deleteId, topicIsSuggest}) => {
    const res = await deleteArticleService(deleteId, topicIsSuggest);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

//

export const confirmArticleStatus = createAsyncThunk('articles/confirmArticleStatus', async ({id, topicId}) => {
    const res = await confirmArticleStatusService(id,topicId);
    console.log(res);
    // toastSuccess(action.payload.EM)
    return res;
})

const ArticleSlicer = createSlice({
    name: 'articles',
    initialState: {
        topics : [],
        funds : [],
        articleItem:{},
        articlesData: [],
        message: {},
        NewsLoading: true,
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
            .addCase(getAllTopicAndFunds.pending, (state, action) => {
                state.NewsLoading = true;
            })
            .addCase(getAllTopicAndFunds.fulfilled, (state, action) => {
                console.log('getAllTopicAndFunds',action.payload);
                state.topics = action.payload.topics
                state.funds = action.payload.funds
                // const responseMessage = action.payload
                state.NewsLoading = false;
                //lay data tu server
            })
            .addCase(createNewArticle.pending, (state, action) => {
                state.NewsLoading = true;
            })
            .addCase(createNewArticle.fulfilled, (state, action) => {
                console.log('action payload',action.payload);
                state.message = action.payload
                // const responseMessage = action.payload
                switch (action.payload.EC) {
                    case "SUCCESS_CREATE_NEW_ARTICLE":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Tạo trang báo không thành công, vui lòng thử lại')
                        break;
                }
                state.NewsLoading = false;
                 //lay data tu server
            })
            .addCase(getAllArticles.pending, (state, action) => {
                state.NewsLoading = true;
            })
            .addCase(getAllArticles.fulfilled, (state, action) => {
                console.log('action payload',action.payload);
                // const responseMessage = action.payload
                state.articlesData = action.payload
                state.NewsLoading = false;
                 //lay data tu server
            })
            .addCase(getSpecificArticle.pending, (state, action) => {
                state.NewsLoading = true;
            })
            .addCase(getSpecificArticle.fulfilled, (state, action) => {
                console.log('action payload',action.payload);
                // const responseMessage = action.payload
                state.articleItem = action.payload
                state.NewsLoading = false;
                 //lay data tu server
            })
            .addCase(updateArticle.pending, (state, action) => {
                state.NewsLoading = true;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                console.log('action payload',action.payload);
                // const responseMessage = action.payload
                // state.articleItem = action.payload
                switch (action.payload.EC) {
                    case "SUCCESS_EDIT_ARTICLE":
                        // console.log('thanh cong');
                        toastSuccess(action.payload.EM)
                        break;
                    default:
                        toastError('Chỉnh sửa trang báo không thành công, vui lòng thử lại')
                        break;
                }
                state.NewsLoading = false;
                 //lay data tu server
            })
            
    }
    

});

export const selectAllTopicsAndFunds = (state, action) => {
    return {
        topics : state.articles.topics,
        funds : state.articles.funds,
    }
}

export const selectAllArticles = (state, action) => {
    return state.articles.articlesData
}

export const selectSpecificArticle = (state, action) => {
    return state.articles.articleItem
}

export default ArticleSlicer;
