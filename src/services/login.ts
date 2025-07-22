import { axiosInstance } from "@/helper/axiosInstance";
import { LoginApiResponse } from "@/types/apResponse";
import { AxiosError } from "axios";

interface LoginDataInput {
  email: string;
  password: string;
}

export const login = async (
  loginData: LoginDataInput
): Promise<LoginApiResponse> => {
  try {
    const response = await axiosInstance.post<LoginApiResponse>(
      "/users/signin",
      loginData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<LoginApiResponse>;

    console.error("Login API error:", axiosError);

    if (axiosError.response?.data) {
      return axiosError.response.data;
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
