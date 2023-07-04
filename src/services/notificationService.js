import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
axios.defaults.withCredentials = true;

const getAllNotificationsService = async (roleId, offset) => {
    try {
        const response = await axios.post(`${baseUrl}/notifications`,{ 
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

const updateReadNotification = async (currentRole,notiId) => {
    try {
        const response = await axios.put(`${baseUrl}/notifications/${notiId}/update`, {
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

export {
    getAllNotificationsService,
    updateReadNotification
}
