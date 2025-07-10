import { axiosInstance } from "@/helper/axiosInstance";
import { LoginApiResponse } from "@/types/apResponse";

interface LoginDataInput {
  email: string;
  password: string;
}

export const login = async (
  loginData: LoginDataInput
): Promise<LoginApiResponse | null> => {
  try {
    const response = await axiosInstance.post<LoginApiResponse>(
      "/users/signin",
      loginData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
