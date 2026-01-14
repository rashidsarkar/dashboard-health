import { baseApi } from "./baseApi";

const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviderTypes: builder.query({
      query: () => ({
        url: "/provider-types/",
        method: "GET",
      }),
      providesTags: ["ProviderType"],
    }),
    addProviderType: builder.mutation({
      query: (data) => ({
        url: "/provider-types/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProviderType"],
    }),
    deleteProviderType: builder.mutation({
      query: (id) => ({
        url: `/provider-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProviderType"],
    }),
    // Inferred Update endpoint based on design
    updateProviderType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/provider-types/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ProviderType"],
    }),
  }),
});

export const {
  useGetProviderTypesQuery,
  useAddProviderTypeMutation,
  useDeleteProviderTypeMutation,
  useUpdateProviderTypeMutation,
} = providerApi;
