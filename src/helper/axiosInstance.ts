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
    if (error.response && error.response.status === 401) {
      // ⚠ Token expired or unauthorized
      store.dispatch(logout()); // ✅ Dispatch directly

      notifications.show({
        title: "Session expired",
        message: "Please log in again",
        color: "red",
      });

      // Optional: redirect
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
