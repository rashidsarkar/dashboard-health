import { baseApi } from "./baseApi";

const manageWebApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Terms & Conditions ---
    getTermsConditions: builder.query({
      query: () => ({
        url: "/manage-web/get-terms-conditions",
        method: "GET",
      }),
      providesTags: ["terms"],
    }),

    addTermsConditions: builder.mutation({
      query: (data) => ({
        url: "/manage-web/add-terms-conditions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),

    editTermsConditions: builder.mutation({
      query: ({ id, data }) => ({
        url: `/manage-web/edit-terms-conditions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),

    deleteTermsConditions: builder.mutation({
      query: (id) => ({
        url: `/manage-web/delete-terms-conditions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["terms"],
    }),

    // --- Privacy Policy ---
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/manage-web/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),

    addPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/manage-web/add-privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),

    editPrivacyPolicy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/manage-web/edit-privacy-policy/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),

    deletePrivacyPolicy: builder.mutation({
      query: (id) => ({
        url: `/manage-web/delete-privacy-policy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["privacy"],
    }),

    // --- FAQ ---
    getFaq: builder.query({
      query: () => ({
        url: "/manage-web/get-faq",
        method: "GET",
      }),
      providesTags: ["faq"],
    }),

    addFaq: builder.mutation({
      query: (data) => ({
        url: "/manage-web/add-faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    editFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/manage-web/edit-faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/manage-web/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  // T&C
  useGetTermsConditionsQuery,
  useAddTermsConditionsMutation,
  useEditTermsConditionsMutation,
  useDeleteTermsConditionsMutation,
  // Privacy
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
  useEditPrivacyPolicyMutation,
  useDeletePrivacyPolicyMutation,
  // FAQ
  useGetFaqQuery,
  useAddFaqMutation,
  useEditFaqMutation,
  useDeleteFaqMutation,
} = manageWebApi;
