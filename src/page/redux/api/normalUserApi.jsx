import { baseApi } from "./baseApi";

const normalUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNormalUsers: builder.query({
      query: ({ type, page, limit }) => {
        let url = "/normal-User";
        if (type === "active") url = "/normal-User/active";
        if (type === "blocked") url = "/normal-User/blocked";

        return {
          url,
          method: "GET",
          params: { page, limit },
        };
      },
      providesTags: ["Users"],
    }),

    // New Block Toggle Mutation
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/auth/block-toggle/${id}`,
        method: "PATCH", // Toggles usually use PATCH or POST
      }),
      invalidatesTags: ["Users"],
    }),
    // Get Single User Details
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/normal-User/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetNormalUsersQuery,
  useBlockUserMutation,
  useGetSingleUserQuery,
} = normalUserApi;
