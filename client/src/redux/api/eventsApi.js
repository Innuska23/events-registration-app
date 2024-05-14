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
  }),
});

export const { useEventsListQuery } = eventsApi;
