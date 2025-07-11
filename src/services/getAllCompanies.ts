import { axiosInstance } from "@/helper/axiosInstance";

export const getAllCompanies = async () => {
  try {
    const response = await axiosInstance.get("/company/");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
