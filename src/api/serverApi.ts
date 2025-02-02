import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChannelMessageType, ChannelType, ServerType } from "model";

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

export const serverApi = createApi({
  reducerPath: "server",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  tagTypes: ["servers"],
  endpoints: (builder) => ({
    getServers: builder.query<ServerType[], void>({
      query: () => ({
        url: "server/",
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
    getChannelInfo: builder.query<ChannelType, string>({
      query: (channelId) => ({
        url: `server/channels/${channelId}`,
        method: "GET",
      }),
      providesTags: ["servers"],
    }),
    createServer: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `server/createServer`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["servers"],
    }),
    sendMessageToChannel: builder.mutation<void, ChannelMessageType>({
      query: (message) => ({
        url: `server/channels/sendMessage`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: ['servers']
    }),
    createServerChannel: builder.mutation<void, CreateChannelRequestType>({
      query: (request) => ({
        url: `server/channels/createChannel`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: ['servers']
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
} = serverApi;
