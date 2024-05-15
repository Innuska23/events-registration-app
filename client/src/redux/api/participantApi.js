import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const participantApi = createApi({
  reducerPath: "participantApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    participantByEvent: build.query({
      query: ({ eventId, search }) => {
        return {
          url: `api/participants/${eventId}`,
          params: search && {
            search,
          },
        };
      },
    }),

    participantByEventStatistic: build.query({
      query: ({ eventId }) => {
        return {
          url: `api/participants/${eventId}/statistic`,
        };
      },
    }),
  }),
});

export const {
  useParticipantByEventQuery,
  useLazyParticipantByEventQuery,
  useParticipantByEventStatisticQuery,
} = participantApi;
