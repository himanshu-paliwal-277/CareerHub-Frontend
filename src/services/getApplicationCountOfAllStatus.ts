import { axiosInstance } from "@/helper/axiosInstance";

export const getApplicationCountOfAllStatus = async () => {
  try {
    const response = await axiosInstance.get("/application/status-count");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
