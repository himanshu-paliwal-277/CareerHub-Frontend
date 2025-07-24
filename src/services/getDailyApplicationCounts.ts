import { axiosInstance } from "@/helper/axiosInstance";

export const getDailyApplicationCounts = async (
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axiosInstance.get("/application/daily-count", {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch daily application counts:", error);
    return null;
  }
};
