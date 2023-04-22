import axios from "axios";
import { formatDateSendDB } from "../utils/format/date-format";
axios.defaults.withCredentials = true;
const createNewCenter = (name, established_date, province, district, address, center_email, phone_number, website, bank_list) => {
    const formattedDate = formatDateSendDB(established_date)
    console.log({formattedDate})
    return  axios.post('http://localhost:8080/centers/add', {
        name,
        established_date : formattedDate,
        province, 
        district, 
        address, 
        center_email,
        phone_number, 
        website, 
        bank_list
    }, {
        withCredentials: true,
    })
    .then((response) => {
        return response.data
    }).catch((error) => {
        console.log({error})
    });
}
const deleteCenter = (centerId) => {
    return axios.delete(`http://localhost:8080/centers/${centerId}/delete`, {
        withCredentials: true,
    })
    .then((response) => {
        return response.data
    }).catch((error) => {
        console.log({error})
    });
}

export {createNewCenter,deleteCenter}