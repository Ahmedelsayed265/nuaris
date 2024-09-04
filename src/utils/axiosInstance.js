import axios from "axios";
import { toast } from "react-toastify";
import { getExceptionMessage } from "./helper";

axios.defaults.baseURL = "https://newstagingapi.nuaris.co";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.data?.exception_type &&
      error.response?.data?.exception
    ) {
      const message = getExceptionMessage(
        error.response.data.exception_type,
        error.response.data.exception
      );
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
