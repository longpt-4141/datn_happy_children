import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
axios.defaults.withCredentials = true;
const createReportServices = async (reportData, requestId) => {
    try {
        const response = await axios.post(`${baseUrl}/reports/add`, {
            reportData, 
            requestId
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log('createRequestServices',{ error });
    }
}

const getAllReportsServices = async (roleId,centerId) => {
    try {
        const response = await axios.post(`${baseUrl}/reports`,{
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

const getSpecificReportServices = async (reportId) => {
    try {
        const response = await axios.get(`${baseUrl}/reports/${reportId}`, {
            withCredentials: true,
        });
        console.log("get specific report", response.data);
        return response.data;
    } catch (error) {
        console.log('getSpecificReportServices',{ error });
    }
}

const updateReportServices = async (reportId,reportData) => {
    try {
        const response = await axios.put(`${baseUrl}/reports/${reportId}/update`, {
            reportData
        }, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('updateStatusRequestServices',{ error });
    }
}

const deleteReportServices = async (reportId) => {
    try {
        const response = await axios.delete(`${baseUrl}/reports/${reportId}/delete`, {
            withCredentials: true,
        });
        console.log("delete", response.data);
        return response.data;
    } catch (error) {
        console.log('deleteReportServices',{ error });
    }
}

const acceptOrRejectReportServices = async (reportId,actionData,currentRole) => {
    try {
        const response = await axios.put(`${baseUrl}/reports/${reportId}/accept-or-reject`, {
            actionData,
            currentRole
        }, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('acceptOrRejectReportServices',{ error });
    }
}

export {
    createReportServices, 
    getAllReportsServices,
    deleteReportServices,
    getSpecificReportServices,
    updateReportServices,
    acceptOrRejectReportServices
}
