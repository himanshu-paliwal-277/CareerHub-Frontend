import { axiosInstance } from "@/helper/axiosInstance";

export const createCompany = async (companyData: any) => {
  try {
    const response = await axiosInstance.post(`/company/`, companyData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
