import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { notifications } from "@mantine/notifications";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  withCredentials: true,
});

// 🔁 Global response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // If 401 and not login/signup route
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest?.url?.includes("/users/signin") &&
      !originalRequest?.url?.includes("/users/signup")
    ) {
      store.dispatch(logout());

      notifications.show({
        title: "Session expired",
        message: "Please log in again",
        color: "red",
      });

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
