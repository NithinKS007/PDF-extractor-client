import axios, { AxiosInstance } from "axios";
import { showErrorToast } from "../utils/toast";
import useAuthStore from "../store/auth";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().accessToken;

      console.log("access one", accessToken);
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error?.response && error?.response?.data?.status === 403) {
        showErrorToast(error?.response?.data?.message);
        useAuthStore.getState().logout();
        window.location.href = "/";
      }
      if (
        error?.response &&
        error?.response?.data?.status === 401 &&
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
          console.log("getting inside catch block axios for refreshing");
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
