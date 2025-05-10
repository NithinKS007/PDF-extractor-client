import axios, { AxiosInstance } from "axios";
import { showErrorToast } from "../utils/toast";
import useAuthStore from "../store/auth/authStore";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/*  
  Purpose: Sets up request interceptor to attach Authorization token if available.
  This interceptor adds the access token from the store to the Authorization header for every outgoing request.
*/
const setupRequestInterceptor = (instance: AxiosInstance) => {
  console.log("Setting up response interceptor...");
  instance.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().accessToken;
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

/*  
  Purpose: Sets up response interceptor to handle errors and token refreshing.
  This interceptor checks for 401 errors (unauthorized) and attempts to refresh the access token if expired.
  If the response status is 403 (forbidden), log out the user and redirect.
*/
const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error?.response?.data?.status === 403) {
        showErrorToast(error?.response.data?.message);
        useAuthStore.getState().logout();
        window.location.href = "/";
      }
      if (
        error.response &&
        error?.response.data?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const response = await axiosInstance.post(
            "/auth/refresh-access-token",
            {},
            { withCredentials: true }
          );
          const { newAccessToken } = response.data.data;
          useAuthStore.getState().setAccessToken(newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.log("Refresh token failed", err);
          window.location.href = "/";
          useAuthStore.getState().logout();
          showErrorToast(error.response.data.message);
        }
      }

      return Promise.reject(error);
    }
  );
};

setupRequestInterceptor(axiosInstance);
setupResponseInterceptor(axiosInstance);
export { axiosInstance };
