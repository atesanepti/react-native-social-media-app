import { ROUTES } from "@/constants/apis";
import { apiSlice } from "./apiSlice";

const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadProfilePic: builder.mutation({
      query: ({ payload, token }) => ({
        url: `api/profile/profile`,
        method: "PUT",
        body: payload,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["user"],
    }),
    uploadCoverPic: builder.mutation({
      query: ({ payload, token }) => ({
        url: `${ROUTES.PROFILE}/cover`,
        method: "PUT",
        body: payload,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: ({ payload, token }) => ({
        url: ROUTES.PROFILE,
        method: "PUT",
        body: payload,
        headers: {
          Authorization: token,
        },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useUploadCoverPicMutation,
  useUploadProfilePicMutation,
} = profileApiSlice;
