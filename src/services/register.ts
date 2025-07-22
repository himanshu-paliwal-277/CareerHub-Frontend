import { axiosInstance } from "@/helper/axiosInstance";
import { RegisterApiResponse } from "@/types/apResponse";
import { AxiosError } from "axios";

interface RegisterDataInput {
  name: string;
  email: string;
  password: string;
}

export const register = async (
  registerData: RegisterDataInput
): Promise<RegisterApiResponse> => {
  try {
    const response = await axiosInstance.post<RegisterApiResponse>(
      "/users/signup",
      registerData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<RegisterApiResponse>;
    console.error("Register API error:", axiosError);

    if (axiosError.response?.data) {
      return {
        success: false,
        message: axiosError.response.data.message,
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
