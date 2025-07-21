import { axiosInstance } from "@/helper/axiosInstance";

export const getTotalCountOfApplication = async (status?: string) => {
  try {
    const response = await axiosInstance.get(`/application/totalCount`, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
