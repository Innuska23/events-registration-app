import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const participantApi = createApi({
  reducerPath: "participantApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    participantByEvent: build.query({
      query: (eventId) => {
        return {
          url: `api/participants/${eventId}`,
        };
      },
    }),
  }),
});

export const { useParticipantByEventQuery } = participantApi;
