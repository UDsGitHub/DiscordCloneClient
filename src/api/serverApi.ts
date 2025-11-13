import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { ChannelMessageType, RawChannelType, ServerType } from "model";

export interface CreateServerRequest {
  serverName: string;
  serverDisplayPicture?: File;
}

export interface CreateServerResponse {
  message: string;
}

export interface CreateChannelRequestType {
  name: string;
  type: 0 | 1;
  serverId: string;
  categoryId?: number;
}

export interface CreateChannelResponseType {
  id: string;
}

export const serverApi = createApi({
  reducerPath: "server",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: ["servers", "channel"],
  endpoints: (builder) => ({
    getServers: builder.query<ServerType[], void>({
      query: () => ({
        url: "server/getServers",
        method: "GET",
      }),
      providesTags: ["servers"],
    }),
    getServer: builder.query<ServerType, string>({
      query: (id) => ({
        url: `server/${id}`,
        method: "GET",
      }),
      providesTags: ["servers"],
    }),
    getChannelInfo: builder.query<RawChannelType, string>({
      query: (channelId) => ({
        url: `server/channels/${channelId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, channelId) => [
        { type: "channel", id: channelId },
      ],
    }),
    createServer: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `server/createServer`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["servers"],
    }),
    sendMessageToChannel: builder.mutation<number, ChannelMessageType>({
      query: (message) => ({
        url: `server/channels/sendMessage`,
        method: "POST",
        body: message,
      }),
      // invalidate only the affected channel so RTK Query will refetch it
      invalidatesTags: (_result, _error, arg) => [
        { type: "channel", id: arg.channelId },
      ],
    }),
    createServerChannel: builder.mutation<
      CreateChannelResponseType,
      CreateChannelRequestType
    >({
      query: (request) => ({
        url: `server/channels/createChannel`,
        method: "POST",
        body: request,
      }),
    }),
    deleteServerChannel: builder.mutation<void, string>({
      query: (channelId) => ({
        url: `server/channels/deleteChannel/${channelId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetServersQuery,
  useLazyGetServerQuery,
  useLazyGetChannelInfoQuery,
  useCreateServerMutation,
  useSendMessageToChannelMutation,
  useCreateServerChannelMutation,
  useDeleteServerChannelMutation,
} = serverApi;

export const getChannelInfoSelector = serverApi.endpoints.getChannelInfo.select;
