import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DmUserListType } from "model";

export const usersApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getDmUsers: builder.query<DmUserListType, string>({
      query: (currentUserId) => {
        console.log('inside users api', currentUserId)
        return {
        url: `/user/getDmUsers/${currentUserId}`,
        method: "GET",
      }},
    }),
  }),
});

export const { useLazyGetDmUsersQuery } = usersApi;
