import { httpClient } from "./httpClient";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  message: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await httpClient
    .post("api/v1/auth/login", { json: payload })
    .json<LoginResponse>();

  return response;
};
