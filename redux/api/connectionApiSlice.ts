import { ROUTES } from "@/constants/apis";
import { apiSlice } from "./apiSlice";

const connectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    connect: builder.mutation({
      query: ({ token, userId }) => ({
        url: `${ROUTES.CONNECTION}/connect/${userId}`,
        method: "PUT",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["user"],
    }),

    disconnect: builder.mutation({
      query: ({ token, userId }) => ({
        url: `${ROUTES.CONNECTION}/disconnect/${userId}`,
        method: "PUT",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useConnectMutation, useDisconnectMutation } = connectionApiSlice;
