import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DmUserListType, User, SendMessageToUserRequest } from "model";

export const usersApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  tagTypes: ["getUser", "getDmUsers"],
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/user/getUser",
        method: "GET",
      }),
      providesTags: ["getUser"],
    }),
    getDmUsers: builder.query<DmUserListType, string>({
      query: (currentUserId) => ({
        url: `/user/getDmUsers/${currentUserId}`,
        method: "GET",
      }),
      providesTags: ["getDmUsers"],
    }),
    sendMessageToUser: builder.mutation<void, SendMessageToUserRequest>({
      query: ({ userId, toUserId, message }) => ({
        url: `/user/sendMessageToUser`,
        method: "POST",
        body: { userId, toUserId, message },
      }),
      invalidatesTags: ["getDmUsers"],
    }),
  }),
});

export const { useGetUserQuery, useLazyGetDmUsersQuery, useSendMessageToUserMutation } = usersApi;
