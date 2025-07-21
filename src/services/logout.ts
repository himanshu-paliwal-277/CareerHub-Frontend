import { axiosInstance } from "@/helper/axiosInstance";

export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
