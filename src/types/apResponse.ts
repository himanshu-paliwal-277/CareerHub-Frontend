// Generic response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// Login response data
export interface LoginResponseData {
  userId: string;
  name: string;
  email: string;
  token: string;
}

export type LoginApiResponse = ApiResponse<LoginResponseData>;

// Register response data
export interface RegisterResponseData {
  userId: string;
  name: string;
  email: string;
  role: string;
}

export type RegisterApiResponse = ApiResponse<RegisterResponseData>;
