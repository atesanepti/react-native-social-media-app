import { ROUTES } from "@/constants/apis";
import { apiSlice } from "./apiSlice";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPostsMine: builder.query({
      query: (token) => ({
        url: `${ROUTES.POST}/mine`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["post"],
    }),

    createPost: builder.mutation({
      query: ({ payload, token }) => ({
        url: `${ROUTES.POST}`,
        body: payload,
        method: "POST",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["post"],
    }),
    createSharePost: builder.mutation({
      query: ({ payload, token }) => ({
        url: `${ROUTES.POST}/share`,
        body: payload,
        method: "POST",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: ({ postId, token }) => ({
        url: `${ROUTES.POST}/${postId}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["post"],
    }),
    fetchPosts: builder.query({
      query: ({ userId, token }) => ({
        url: `${ROUTES.POST}/user/${userId}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["post"],
    }),
    fetchSinglePost: builder.query({
      query: ({ postId, token }) => ({
        url: `${ROUTES.POST}/${postId}`,
        headers: {
          Authorization: token,
        },
      }),
    }),
    fetchNewsfeedPosts: builder.query({
      query: (token) => ({
        url: `${ROUTES.POST}/newsfeed`,
        headers: {
          Authorization: token,
        },
      }),
    }),
    mentionFetch: builder.query({
      query: ({ token, search }) => ({
        url: `${ROUTES.POST}/mentions?search=${search}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useCreateSharePostMutation,
  useFetchPostsMineQuery,
  useDeletePostMutation,
  useFetchPostsQuery,
  useFetchSinglePostQuery,
  useMentionFetchQuery,
  useFetchNewsfeedPostsQuery,
} = postApiSlice;
