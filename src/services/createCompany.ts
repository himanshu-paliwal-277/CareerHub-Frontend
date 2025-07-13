import { axiosInstance } from "@/helper/axiosInstance";
import { CompanyDataInput } from "@/types/apResponse";

export const createCompany = async (companyData: CompanyDataInput) => {
  try {
    const response = await axiosInstance.post(`/company/`, companyData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
