import { httpClient } from "./httpClient";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    userId: number;
    message?: string;
  };
}

export interface SignupPayload {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export const login = async (payload: LoginPayload) => {
  const response = await httpClient
    .post("api/v1/auth/login", { json: payload })
    .json<LoginResponse>();

  return response;
};

export interface SignupResponseData {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

export interface SignupResponse {
  success: boolean;
  code: string;
  message: string;
  data: SignupResponseData;
}

export const signup = async (payload: SignupPayload) => {
  const response = await httpClient
    .post("api/v1/users", { json: payload })
    .json<SignupResponse>();
  return response;
};

export interface DeleteUserResponse {
  success: boolean;
  code: string;
  message: string;
  data: Record<string, never>;
}

export const deleteUserAccount = async (userId: string | number) => {
  const response = await httpClient
    .delete(`api/v1/users/${userId}`)
    .json<DeleteUserResponse>();
  return response;
};

export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

interface UserProfileResponse {
  success: boolean;
  code: string;
  message: string;
  data: UserProfile;
}

export const getUserProfile = async (userId: string | number) => {
  const response = await httpClient
    .get(`api/v1/users/${userId}`)
    .json<UserProfileResponse>();
  return response.data;
};

export interface UpdateUserPayload {
  name: string;
  email: string;
  age: number;
}

interface UpdateUserResponse {
  success: boolean;
  code: string;
  message: string;
  data: UserProfile;
}

export const updateUserProfile = async (
  userId: number,
  payload: UpdateUserPayload,
) => {
  const response = await httpClient
    .patch(`api/v1/users/${userId}`, { json: payload })
    .json<UpdateUserResponse>();
  return response.data;
};
