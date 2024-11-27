import { ROUTES } from "@/constants/apis";
import { apiSlice } from "./apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchComments: builder.query({
      query: ({ postId, token }) => ({
        url: `${ROUTES.COMMENT}/${postId}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
      providesTags: ["comment"],
    }),
    createComment: builder.mutation({
      query: ({ payload, token }) => ({
        url: `${ROUTES.COMMENT}`,
        method: "POST",
        body: payload, // payload {text,postId}
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["comment"],
    }),

    createReplyComment: builder.mutation({
      query: ({ payload, token, commentId }) => ({
        url: `${ROUTES.COMMENT}/reply/${commentId}`,
        method: "POST",
        body: payload, // payload {text, postId}
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["comment"],
    }),

    updateComment: builder.mutation({
      query: ({ payload, commentId, token }) => ({
        url: `${ROUTES.COMMENT}/${commentId}`,
        method: "PUT",
        body: payload, // payload {text}
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["comment"],
    }),

    deleteComment: builder.mutation({
      query: ({ commentId, token }) => ({
        url: `${ROUTES.COMMENT}/${commentId}`,
        method: "PUT",
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useFetchCommentsQuery,
  useCreateCommentMutation,
  useCreateReplyCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApiSlice;
