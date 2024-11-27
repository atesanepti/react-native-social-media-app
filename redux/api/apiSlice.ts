import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/src/query/react";
import { ROUTES } from "@/constants/apis.js";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: ROUTES.BASE }),
  endpoints: (builder) => ({}),
  tagTypes: ["user", "post", "comment", "notification"],
});
