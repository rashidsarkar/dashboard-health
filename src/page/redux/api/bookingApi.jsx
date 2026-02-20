import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointment: builder.query({
      query: (params) => ({
        url: "/appointment/all-appointments",
        method: "GET",
        params, // Pass page and limit here
      }),
      providesTags: ["appointment"],
    }),

    // FIXED: Properly defined delete mutation
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointment/delete-appointment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["appointment"], // Automatically refreshes the list
    }),
  }),
});

export const { useGetAppointmentQuery, useDeleteAppointmentMutation } =
  bookingApi;
