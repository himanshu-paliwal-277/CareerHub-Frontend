import { axiosInstance } from "@/helper/axiosInstance";

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
