import { ApplicationInput } from "@/components/application-form/ApplicationForm";
import { axiosInstance } from "@/helper/axiosInstance";

export const updateApplication = async (
  applicationId: string,
  applicationData: ApplicationInput
) => {
  try {
    const response = await axiosInstance.put(
      `/application/${applicationId}`,
      applicationData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
