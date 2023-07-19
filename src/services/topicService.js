import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
axios.defaults.withCredentials = true;
const createNewTopicService = async (topicData) => {
    try {
        const response = await axios.post(`${baseUrl}/master-setting/topics/add`, 
            topicData
        , {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

const getAllTopicsService = async () => {
    try {
        const response = await axios.get(`${baseUrl}/master-setting/topics`,
        {
            withCredentials: true,
        });
        return response.data
    }
    catch (error) {
        console.log({ error });
    }
}

const getSpecificTopicService = async (topicId) => {
    try {
        const response = await axios.get(`${baseUrl}/master-setting/topics/${topicId}`,
        {
            withCredentials: true,
        });
        return response.data
    }
    catch (error) {
        console.log({ error });
    }
}

const editTopicService = async (topicId, topicData) => {
    try {
        const response = await axios.put(`${baseUrl}/master-setting/topics/${topicId}/update`,
        topicData,
        {
            withCredentials: true,
        });
        return response.data
    }
    catch (error) {
        console.log({ error });
    }
}

const deleteTopicService = async (topicId) => {
    try {
        const response = await axios.delete(`${baseUrl}/master-setting/topics/${topicId}/delete`,
        {
            withCredentials: true,
        });
        return response.data
    }
    catch (error) {
        console.log({ error });
    }
}

export {createNewTopicService, getAllTopicsService, getSpecificTopicService, editTopicService, deleteTopicService}