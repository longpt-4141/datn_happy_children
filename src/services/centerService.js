import axios from "axios";
import { formatDateSendDB } from "../utils/format/date-format";
import { baseUrl } from "../constants/baseUrl";
axios.defaults.withCredentials = true;
const createNewCenter = async (name, established_date, province, district, address, center_email, phone_number, website, bank_list) => {
    const formattedDate = formatDateSendDB(established_date)
    console.log({formattedDate})
    try {
        const response = await axios.post(`${baseUrl}/centers/add`, {
            name,
            established_date: formattedDate,
            province,
            district,
            address,
            center_email,
            phone_number,
            website,
            bank_list
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}
const deleteCenter = async (centerId) => {
    try {
        const response = await axios.delete(`${baseUrl}/centers/${centerId}/delete`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

const checkExistedEmail = async (email) => {
    try {
        const response = await axios.post(`${baseUrl}/register/checkExistEmail`, {
            email : email
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export {createNewCenter,deleteCenter, checkExistedEmail}