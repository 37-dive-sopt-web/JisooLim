import { httpClient } from "./httpClient";
import type { ApiResponse } from "./types";

const AUTH_BASE_PATH = "api/v1/auth";
const USERS_BASE_PATH = "api/v1/users";

type UserId = string | number;

const extractData = async <T>(promise: Promise<ApiResponse<T>>) => {
  const response = await promise;
  return response.data;
};

export interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponseData {
  userId: number;
}

export interface SignupPayload {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export const login = (payload: LoginPayload) =>
  extractData(
    httpClient
      .post(`${AUTH_BASE_PATH}/login`, { json: payload })
      .json<ApiResponse<LoginResponseData>>(),
  );

export interface SignupResponseData {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

export const signup = (payload: SignupPayload) =>
  extractData(
    httpClient
      .post(USERS_BASE_PATH, { json: payload })
      .json<ApiResponse<SignupResponseData>>(),
  );

export const deleteUserAccount = (userId: UserId) =>
  httpClient
    .delete(`${USERS_BASE_PATH}/${userId}`)
    .json<ApiResponse<Record<string, never>>>();

export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

export const getUserProfile = (userId: UserId) =>
  extractData(
    httpClient
      .get(`${USERS_BASE_PATH}/${userId}`)
      .json<ApiResponse<UserProfile>>(),
  );

export interface UpdateUserPayload {
  name: string;
  email: string;
  age: number;
}

export const updateUserProfile = (userId: UserId, payload: UpdateUserPayload) =>
  extractData(
    httpClient
      .patch(`${USERS_BASE_PATH}/${userId}`, { json: payload })
      .json<ApiResponse<UserProfile>>(),
  );
