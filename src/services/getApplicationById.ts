import { axiosInstance } from "@/helper/axiosInstance";

export const getApplicationById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/application/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
