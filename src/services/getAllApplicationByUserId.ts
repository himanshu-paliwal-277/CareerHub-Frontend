import { axiosInstance } from "@/helper/axiosInstance";

export const getAllApplicationByUserId = async (
  page: number,
  limit?: number
) => {
  try {
    const response = await axiosInstance.get("/application/", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
