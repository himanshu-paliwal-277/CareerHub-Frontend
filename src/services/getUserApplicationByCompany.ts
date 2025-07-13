import { axiosInstance } from "@/helper/axiosInstance";

export const getUserApplicationByCompany = async (companyId: string) => {
  try {
    const response = await axiosInstance.get(`/application/${companyId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
