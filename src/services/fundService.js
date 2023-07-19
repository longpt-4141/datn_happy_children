import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
axios.defaults.withCredentials = true;
const createNewFundService = async (fundData) => {
    try {
        const response = await axios.post(`${baseUrl}/master-setting/funds/add`, 
            fundData
        , {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

const getAllFundsService = async () => {
    try {
        const response = await axios.get(`${baseUrl}/master-setting/funds`,
        {
            withCredentials: true,
        });
        return response.data
    }
    catch (error) {
        console.log({ error });
    }
}

const getSpecificFundService = async (fundId) => {
    try {
        const response = await axios.get(`${baseUrl}/master-setting/funds/${fundId}`,
        {
            withCredentials: true,
        });
        return response.data
    }
    catch (error) {
        console.log({ error });
    }
}

const editFundService = async (fundId, fundData) => {
    try {
        const response = await axios.put(`${baseUrl}/master-setting/funds/${fundId}/update`,
        fundData,
        {
            withCredentials: true,
        });
        return response.data
    }
    catch (error) {
        console.log({ error });
    }
}

const deleteFundService = async (fundId) => {
    try {
        const response = await axios.delete(`${baseUrl}/master-setting/funds/${fundId}/delete`,
        {
            withCredentials: true,
        });
        return response.data
    }
    catch (error) {
        console.log({ error });
    }
}

export {createNewFundService, getAllFundsService, getSpecificFundService, editFundService, deleteFundService}