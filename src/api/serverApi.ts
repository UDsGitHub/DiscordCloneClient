import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChannelMessageType, ChannelType, ServerType } from "model";

export interface CreateServerRequest {
  serverName: string;
  serverDisplayPicture?: File;
}

export interface CreateServerResponse {
  message: string;
}

export interface GetChannelInfoRequest {
  serverId: string;
  channelId: string;
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
    getChannelInfo: builder.query<ChannelType, GetChannelInfoRequest>({
      query: ({ serverId, channelId }) => ({
        url: `server/${serverId}/channels/${channelId}`,
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
      invalidatesTags: ['servers']
    }),
    sendMessageToChannel: builder.mutation<void, ChannelMessageType>({
      query: (message) => ({
        url: `server/sendChannelMessage`,
        method: "POST",
        body: message,
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
} = serverApi;
