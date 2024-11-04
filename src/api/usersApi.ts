import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DmUserListType, User, SendMessageToUserRequest, FriendRequest } from "model";

export const usersApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  tagTypes: ["user", "dmUsers", "friends", "friendRequests"],
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/user/getUser",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getFriends: builder.query<User[], void>({
      query: () => ({
        url: `/user/getFriends`,
        method: "GET",
      }),
      providesTags: ["friends"],
    }),
    getDmUsers: builder.query<DmUserListType, void>({
      query: () => ({
        url: `/user/getDmUsers`,
        method: "GET",
      }),
      providesTags: ["dmUsers"],
    }),
    sendMessageToUser: builder.mutation<void, SendMessageToUserRequest>({
      query: ({ toUserId, message }) => ({
        url: `/user/sendMessageToUser`,
        method: "POST",
        body: { toUserId, message },
      }),
      invalidatesTags: ["dmUsers"],
    }),
    sendFriendRequest: builder.mutation<void, string>({
      query: (toUsername) => ({
        url: `/user/sendFriendRequest`,
        method: "POST",
        body: { toUsername },
      }),
      invalidatesTags: ["friendRequests"],
    }),
    getFriendRequests: builder.query<FriendRequest[], void>({
      query: () => ({
        url: `/user/getFriendRequests`,
        method: "GET",
      }),
      providesTags: ["friendRequests"],
    }),
    addFriend: builder.mutation<void, string>({
      query: (friendId) => ({
        url: `/user/addFriend`,
        method: "POST",
        body: { friendId },
      }),
      invalidatesTags: ["friendRequests"],
    }),
    unFriend: builder.mutation<void, string>({
      query: (friendId) => ({
        url: `/user/unFriend`,
        method: "DELETE",
        body: { friendId },
      }),
      invalidatesTags: ["friendRequests"],
    }),
    ignoreFriendRequest: builder.mutation<void, string>({
      query: (friendUsername) => ({
        url: `/user/ignoreFriendRequest`,
        method: "DELETE",
        body: { friendUsername },
      }),
      invalidatesTags: ["friendRequests"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetDmUsersQuery,
  useSendMessageToUserMutation,
  useSendFriendRequestMutation,
  useIgnoreFriendRequestMutation,
  useGetFriendRequestsQuery,
  useAddFriendMutation,
  useUnFriendMutation,
  useGetFriendsQuery,
} = usersApi;
