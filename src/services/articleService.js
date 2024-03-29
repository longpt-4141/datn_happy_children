import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
axios.defaults.withCredentials = true;
const createNewArticleService = async (articleData) => {
    // const formattedDate = formatDateSendDB(established_date)
    // console.log({formattedDate})
    try {
        const response = await axios.post(`${baseUrl}/news/add`, {
            articleData
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

const getAllTopicAndFundsService = async () => {
    try {
        const response = await axios.get(`${baseUrl}/news/topic-and-funds`, {
            withCredentials: true,
        });
        return response.data;
    }
    catch (error) {
        console.log({ error });
    }
}

const getAllArticlesService = async (searchText) => {
    try {
        const response = await axios.get(`${baseUrl}/news`, {params : {param : searchText}} ,{
            withCredentials: true,
        });
        return response.data;
    }
    catch (error) {
        console.log({ error });
    }
}

const getSpecificArticleService = async (articleId) => {
    try {
        const response = await axios.get(`${baseUrl}/news/${articleId}` ,{
            withCredentials: true,
        });
        return response.data;
    }
    catch (error) {
        console.log({ error });
    }
}

const editArticleService = async (articleId, editedData) => {
    try {
        const response = await axios.put(`${baseUrl}/news/${articleId}/edit` ,{editedData},{
            withCredentials: true,
        });
        return response.data;
    }
    catch (error) {
        console.log({ error });
    }
}

const deleteArticleService = async (articleId,topicIsSuggest) => {
    try {
        const response = await axios.delete(`${baseUrl}/news/${articleId}/delete-article`, {topicIsSuggest} ,{
            withCredentials: true,
        });
        return response.data;
    }
    catch (error) {
        console.log({ error });
    }
}

const confirmArticleStatusService = async (articleId, topicId) => {
    try {
        const response = await axios.put(`${baseUrl}/news/${articleId}/confirm-article` ,{topicId},{
            withCredentials: true,
        });
        return response.data;
    }
    catch (error) {
        console.log({ error });
    }
}

export {createNewArticleService, getAllTopicAndFundsService, getAllArticlesService, getSpecificArticleService, editArticleService,confirmArticleStatusService, deleteArticleService}