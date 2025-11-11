import { httpClient } from "./httpClient";
import type { ApiResponse } from "./types";

const AUTH_BASE_PATH = "api/v1/auth";
const USERS_BASE_PATH = "api/v1/users";

type UserId = string | number;

type UserFields = {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
};

type UserRecord = Omit<UserFields, "password"> & {
  id: number;
  status: string;
};

type UserContact = Pick<UserFields, "name" | "email" | "age">;

const extractData = async <T>(promise: Promise<ApiResponse<T>>) => {
  const response = await promise;
  return response.data;
};

export type LoginPayload = Pick<UserFields, "username" | "password">;

interface LoginResponseData {
  userId: number;
}

export type SignupPayload = UserFields;

export const login = (payload: LoginPayload) =>
  extractData(
    httpClient
      .post(`${AUTH_BASE_PATH}/login`, { json: payload })
      .json<ApiResponse<LoginResponseData>>(),
  );

type SignupResponseData = UserRecord;

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

export type UserProfile = UserRecord;

export const getUserProfile = (userId: UserId) =>
  extractData(
    httpClient
      .get(`${USERS_BASE_PATH}/${userId}`)
      .json<ApiResponse<UserProfile>>(),
  );

export type UpdateUserPayload = UserContact;

export const updateUserProfile = (userId: UserId, payload: UpdateUserPayload) =>
  extractData(
    httpClient
      .patch(`${USERS_BASE_PATH}/${userId}`, { json: payload })
      .json<ApiResponse<UserProfile>>(),
  );
