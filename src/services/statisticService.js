import axiosInterceptorInstance from "./axios/axiosInterceptorInstance";

const fetchAllMoney = async (url) => {
    try {
        const response = await axiosInterceptorInstance.get(
            url,
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export {fetchAllMoney}