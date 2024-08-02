import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DmUserListType, User } from "model";

export const usersApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/user/getUser",
        method: "GET",
      }),
    }),
    getDmUsers: builder.query<DmUserListType, string>({
      query: (currentUserId) => ({
        url: `/user/getDmUsers/${currentUserId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUserQuery, useLazyGetDmUsersQuery } = usersApi;
