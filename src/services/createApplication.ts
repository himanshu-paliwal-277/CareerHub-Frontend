import { ApplicationInput } from "@/components/application-form/ApplicationForm";
import { axiosInstance } from "@/helper/axiosInstance";

export const createApplication = async (applicationData: ApplicationInput) => {
  try {
    const response = await axiosInstance.post(`/application/`, applicationData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
