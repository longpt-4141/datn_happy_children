import axios from "axios";
axios.defaults.withCredentials = true;
// const createRequestServices = async (centerData) => {
//     try {
//         const response = await axios.post('http://localhost:8080/requests/add', {
//             centerData
//         }, {
//             withCredentials: true,
//         });
//         return response.data;
//     } catch (error) {
//         console.log('createRequestServices',{ error });
//     }
// }
const getAllNotificationsService = async (roleId, offset) => {
    try {
        const response = await axios.post('http://localhost:8080/notifications',{ 
            roleId : roleId,
            offset : offset*10-10,
    }, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

// const getSpecificRequestServices = async (requestId) => {
//     try {
//         const response = await axios.get(`http://localhost:8080/requests/${requestId}`, {
//             withCredentials: true,
//         });
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.log('getSpecificRequest',{ error });
//     }
// }

const updateReadNotification = async (currentRole,notiId) => {
    try {
        const response = await axios.put(`http://localhost:8080/notifications/${notiId}/update`, {
            currentRole
        }, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('updateReadNotification',{ error });
    }
}

// const deleteRequestServices = async (requestId) => {
//     try {
//         const response = await axios.delete(`http://localhost:8080/requests/${requestId}/delete`, {
//             withCredentials: true,
//         });
//         console.log("delete", response.data);
//         return response.data;
//     } catch (error) {
//         console.log('deleteRequestServices',{ error });
//     }
// }

// const updateMoneyConfirmStatusServices = async (requestId,requestStatus) => {
//     try {
//         const response = await axios.put(`http://localhost:8080/requests/${requestId}/update_confirm_money`, {
//             requestStatus
//         }, {
//             withCredentials: true,
//         });
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.log('updateStatusRequestServices',{ error });
//     }
// }

export {
    getAllNotificationsService,
    updateReadNotification
}
