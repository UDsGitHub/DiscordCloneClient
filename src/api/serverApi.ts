import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChannelType, ServerList, ServerType } from "model";

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
    getServers: builder.query<ServerList[], void>({
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
    }),
  }),
});

export const {
  useLazyGetServersQuery,
  useLazyGetServerQuery,
  useLazyGetChannelInfoQuery,
  useCreateServerMutation,
} = serverApi;
