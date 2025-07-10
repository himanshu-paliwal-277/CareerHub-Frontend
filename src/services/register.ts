import { axiosInstance } from "@/helper/axiosInstance";
import { RegisterApiResponse } from "@/types/apResponse";

interface RegisterDataInput {
  email: string;
  password: string;
}

export const register = async (
  registerData: RegisterDataInput
): Promise<RegisterApiResponse | null> => {
  try {
    const response = await axiosInstance.post<RegisterApiResponse>(
      "/users/signup",
      registerData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
