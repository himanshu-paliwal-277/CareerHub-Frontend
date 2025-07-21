import { axiosInstance } from "@/helper/axiosInstance";

export const getTotalCountOfCompany = async () => {
  try {
    const response = await axiosInstance.get(`/company/totalCount`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
