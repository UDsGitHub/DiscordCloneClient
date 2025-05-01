import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "api";
import { User } from "model";

interface RegisterParams {
  email: string;
  displayName: string;
  username: string;
  password: string;
  birthdate: Date;
}

interface RegisterResponse {
  message: string;
  user?: User;
}

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user?: User;
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterParams>({
      query: ({ email, displayName, username, password, birthdate }) => ({
        url: "/auth/register",
        method: "POST",
        body: { email, displayName, username, password, birthdate },
      }),
    }),
    login: builder.mutation<LoginResponse, LoginParams>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
