import { getToken } from "@/helpers/token";
import { apiSlice } from "./apiSlice";
import { ROUTES } from "@/constants/apis";

interface User {
  username?: string;
  email?: string;
  image?: string;
  id?: string;
  postCount?: string;
}

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userMine: builder.query({
      query: (token) => ({
        headers: {
          Authorization: token,
        },
        method: "GET",
        url: `${ROUTES.USER}/mine`,
      }),
      providesTags: ["user"],
    }),
    userCreate: builder.mutation({
      query: (payload) => ({
        method: "POST",
        url: `${ROUTES.USER}`,
        body: payload,
      }),
    }),
    userUpdate: builder.mutation({
      query: ({ payload, token }) => ({
        url: `${ROUTES.USER}/mine`,
        method: "PUT",
        body: payload,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["user"],
    }),
    userLogin: builder.mutation({
      query: (payload) => ({
        method: "POST",
        url: `${ROUTES.AUTH}/login`,
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    findUser: builder.query({
      query: ({ userId, token }) => ({
        url: `${ROUTES.USER}/${userId},`,
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["user"],
    }),
    searchUser: builder.query({
      query: ({ search, token }) => ({
        url: `${ROUTES.USER}/search?search=${search}`,
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useUserMineQuery,
  useUserCreateMutation,
  useUserUpdateMutation,
  useUserLoginMutation,
  useFindUserQuery,
  useSearchUserQuery,
} = userApiSlice;
