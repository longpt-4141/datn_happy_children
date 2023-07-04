import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
axios.defaults.withCredentials = true;
const createRequestServices = async (centerData) => {
    try {
        const response = await axios.post(`${baseUrl}/requests/add`, {
            centerData
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log('createRequestServices',{ error });
    }
}
const getAllRequestServices = async (roleId,centerId) => {
    try {
        const response = await axios.post(`${baseUrl}/requests`,{ 
            roleId : roleId,
            centerId : centerId
    }, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

const getSpecificRequestServices = async (requestId) => {
    try {
        const response = await axios.get(`${baseUrl}/requests/${requestId}`, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('getSpecificRequest',{ error });
    }
}

const updateStatusRequestServices = async (requestId,requestStatus) => {
    try {
        const response = await axios.put(`${baseUrl}/requests/${requestId}/update`, {
            requestStatus
        }, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('updateStatusRequestServices',{ error });
    }
}

const deleteRequestServices = async (requestId) => {
    try {
        const response = await axios.delete(`${baseUrl}/requests/${requestId}/delete`, {
            withCredentials: true,
        });
        console.log("delete", response.data);
        return response.data;
    } catch (error) {
        console.log('deleteRequestServices',{ error });
    }
}

const updateMoneyConfirmStatusServices = async (requestId,requestStatus) => {
    try {
        const response = await axios.put(`${baseUrl}/requests/${requestId}/update_confirm_money`, {
            requestStatus
        }, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('updateStatusRequestServices',{ error });
    }
}

export {
    createRequestServices, 
    getAllRequestServices, 
    getSpecificRequestServices, 
    updateStatusRequestServices ,
    deleteRequestServices,
    updateMoneyConfirmStatusServices,
}
