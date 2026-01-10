import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointment: builder.query({
      query: () => ({
        url: "/appointment/all-appointments",
        method: "GET",
      }),
      providesTags: ["appointment"],
    }),
  }),
});

export const { useGetAppointmentQuery } = bookingApi;
