import { axiosInstance } from "@/helper/axiosInstance";

export const getAllCompanies = async (
  page: number,
  limit?: number,
  search?: string,
  location?: string,
  tags?: string,
  sortBy?: string,
  sortOrder?: string
) => {
  try {
    const response = await axiosInstance.get("/company/", {
      params: {
        page,
        limit,
        search,
        location,
        tags,
        sortBy,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
