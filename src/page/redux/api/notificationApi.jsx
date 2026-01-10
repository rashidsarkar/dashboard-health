import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: "/notification/get-notifications",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),

    // Mark notifications as seen
    seeNotification: builder.mutation({
      query: () => ({
        url: "/notification/see-notifications",
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),

    // Delete a specific notification
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/delete-notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useSeeNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
