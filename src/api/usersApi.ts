import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DmUserListType,
  User,
  SendMessageToUserRequest,
  FriendRequest,
  FriendUser,
  ServerInviteRequest,
} from "model";
import { API_URL } from "../config";

export const usersApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
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
    getFriends: builder.query<FriendUser[], void>({
      query: () => ({
        url: `/user/getFriends`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? result.map((it) => ({ type: "friends", id: it.id })) : [],
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
    sendFriendRequest: builder.mutation<
      void,
      { toUsername?: string; toUserId?: string }
    >({
      query: ({ toUsername, toUserId }) => ({
        url: `/user/sendFriendRequest`,
        method: "POST",
        body: { toUsername, toUserId },
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
      invalidatesTags: ["friendRequests", "friends"],
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
    sendServerInvite: builder.mutation<void, ServerInviteRequest>({
      query: ({ serverId, userId }) => ({
        url: `/user/sendServerInvite`,
        method: "POST",
        body: { serverId, userId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "friends", id: arg.userId },
      ],
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
  useSendServerInviteMutation,
} = usersApi;
