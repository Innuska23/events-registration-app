import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    registrationList: build.query({
      query: () => {
        return {
          url: `api/registration`,
        };
      },
    }),
    register: build.mutation({
      query: (formData) => ({
        url: "api/registration",
        body: formData,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegistrationListQuery, useRegisterMutation } =
  registrationApi;
