import { baseApi } from "./baseApi";

const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (params) => ({
        url: "/article",
        method: "GET",
        params,
      }),
      providesTags: ["article"],
    }),
    addArticle: builder.mutation({
      query: (formData) => ({
        url: "/article",
        method: "POST",
        body: formData, // FormData containing 'data' and 'article_image'
      }),
      invalidatesTags: ["article"],
    }),
    updateArticle: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/article/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["article"],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/article/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["article"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
