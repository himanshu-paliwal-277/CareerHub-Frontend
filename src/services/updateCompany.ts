import { axiosInstance } from "@/helper/axiosInstance";

export const updateCompany = async (companyId: string, companyData: any) => {
  try {
    const response = await axiosInstance.post(
      `/company/${companyId}`,
      companyData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
