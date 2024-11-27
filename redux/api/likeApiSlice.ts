import { ROUTES } from "@/constants/apis";
import { apiSlice } from "./apiSlice";

const likeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeLike: builder.mutation({
      query: ({ payload, postId, token }) => ({
        url: `${ROUTES.LIKE}/${postId}`,
        method: "put",
        body: payload,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const { useMakeLikeMutation } = likeApiSlice;
