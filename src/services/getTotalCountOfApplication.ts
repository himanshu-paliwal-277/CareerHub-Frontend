import { axiosInstance } from "@/helper/axiosInstance";

export const getTotalCountOfApplication = async () => {
  try {
    const response = await axiosInstance.get(`/application/totalCount`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
