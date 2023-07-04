import axios from 'axios';
import { baseUrl } from '../../constants/baseUrl';

// axios.defaults.withCredentials = true;

const axiosInterceptorInstance = axios.create({
  baseURL: baseUrl, // Replace with your API base URL
});


// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);
// End of Response interceptor

export default axiosInterceptorInstance;