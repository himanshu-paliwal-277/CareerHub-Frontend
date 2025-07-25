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

export interface Application {
  _id: string;
  company: {
    _id: string;
    name: string;
  };
  user: string;
  status: string;
  applicationDate: string; // ISO date string
  notes: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface Company {
  _id: string;
  name: string;
  website: string;
  linkedin: string;
  location: string;
  companySize: string;
  contactInfo: {
    contactPerson: string;
    mobile: string;
    email: string;
    linkedIn: string;
  };
  tags: string[];
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  isApplied?: boolean; // Optional field to indicate if the user has applied to this company
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface CompanyDataInput {
  name: string;
  location: string;
  contactPerson?: string;
  tags?: string[];
  website?: string;
  linkedin?: string;
}

export interface Application {
  _id: string;
  company: {
    _id: string;
    name: string;
  };
  user: string;
  status: string;
  applicationDate: string; // ISO date string
  notes: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
