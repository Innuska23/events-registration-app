import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    eventsList: build.query({
      query: () => {
        return {
          url: `api/events`,
        };
      },
    }),

    eventRegistration: build.mutation({
      query: (formData) => ({
        url: "api/events/registration",
        body: formData,
        method: "POST",
      }),
    }),
  }),
});

export const { useEventsListQuery, useEventRegistrationMutation } = eventsApi;
