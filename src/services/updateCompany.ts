import { axiosInstance } from "@/helper/axiosInstance";
import { CompanyDataInput } from "@/types/apResponse";

export const updateCompany = async (
  companyId: string,
  companyData: CompanyDataInput
) => {
  try {
    const response = await axiosInstance.put(
      `/company/${companyId}`,
      companyData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
