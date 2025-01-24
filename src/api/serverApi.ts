import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerType, User } from "model";

export interface CreateServerRequest {
  serverName: string;
  serverDisplayPicture?: File;
}

export interface CreateServerResponse {
  message: string;
}

export const serverApi = createApi({
  reducerPath: "servers",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  tagTypes: ["servers"],
  endpoints: (builder) => ({
    getServers: builder.query<ServerType[], void>({
      query: () => ({
        url: "/servers/getServers",
        method: "GET",
      }),
      providesTags: ["servers"],
    }),

    createServer: builder.mutation<void, CreateServerRequest>({
      query: ({ serverName, serverDisplayPicture }) => ({
        url: `/servers/createServer`,
        method: "POST",
        body: { serverName, serverDisplayPicture },
      }),
    }),
  }),
});

export const {useGetServersQuery, useCreateServerMutation} = serverApi;
