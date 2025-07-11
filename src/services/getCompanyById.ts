import { axiosInstance } from "@/helper/axiosInstance";

export const getCompanyById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/company/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
