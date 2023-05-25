import axios from "axios";
axios.defaults.withCredentials = true;
const createReportServices = async (reportData, requestId) => {
    try {
        const response = await axios.post('http://localhost:8080/reports/add', {
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
        const response = await axios.post('http://localhost:8080/reports',{
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
        const response = await axios.get(`http://localhost:8080/reports/${reportId}`, {
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
        const response = await axios.put(`http://localhost:8080/reports/${reportId}/update`, {
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
        const response = await axios.delete(`http://localhost:8080/reports/${reportId}/delete`, {
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
        const response = await axios.put(`http://localhost:8080/reports/${reportId}/accept-or-reject`, {
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
