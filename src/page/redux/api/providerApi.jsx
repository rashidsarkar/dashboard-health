import { baseApi } from "./baseApi";

const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get Providers with dynamic filters
    getProviders: builder.query({
      query: ({ providerTypeId, status, page, limit }) => ({
        url: "/provider/all-providers",
        method: "GET",
        params: {
          providerTypeId,
          status, // 'active' or 'blocked'
          page,
          limit,
        },
      }),
      providesTags: ["provider"],
    }),

    // 2. Get Provider Types (for the Sort dropdown)
    getProviderTypes: builder.query({
      query: () => ({
        url: "/provider-types/",
        method: "GET",
      }),
    }),

    // 3. Block Toggle
    toggleProviderBlock: builder.mutation({
      query: (id) => ({
        url: `/auth/block-toggle/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["provider"],
    }),
    // 2. Get Single Provider by ID
    getSingleProvider: builder.query({
      query: (id) => ({
        url: `/provider/${id}`,
        method: "GET",
      }),
      providesTags: ["provider"],
    }),
  }),
});

export const {
  useGetProvidersQuery,
  useGetProviderTypesQuery, // New hook
  useToggleProviderBlockMutation,
  useGetSingleProviderQuery,
} = providerApi;
