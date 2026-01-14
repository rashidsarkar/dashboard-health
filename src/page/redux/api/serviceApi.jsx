import { baseApi } from "./baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Using POST to match your requirement: body { "providerType": "HOSPITAL" }
    getAdminServices: builder.query({
      query: (filter) => ({
        url: `/service/admin-service/${filter}`,
        method: "GET",
        // body: filter, // { providerType: "..." }
      }),
      providesTags: ["service"],
    }),

    addService: builder.mutation({
      query: (data) => ({
        url: "/service/create-service",
        method: "POST",
        body: { ...data, price: Number(data.price) },
      }),
      invalidatesTags: ["service"],
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/update-service/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/delete-service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useGetAdminServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
