import { baseApi } from "./baseApi";

const metaDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. General Stats
    getMetaData: builder.query({
      query: () => ({
        url: "/meta/meta-data",
        method: "GET",
      }),
      providesTags: ["metaData"],
    }),

    // 2. User Chart Data
    getUserChartData: builder.query({
      query: (year) => ({
        url: `/meta/normalUser-chart-data?year=${year}`,
        method: "GET",
      }),
      providesTags: ["metaData"],
    }),

    // 3. Provider Chart Data
    getProviderChartData: builder.query({
      query: (year) => ({
        url: `/meta/provider-chart-data?year=${year}`,
        method: "GET",
      }),
      providesTags: ["metaData"],
    }),
  }),
});

export const {
  useGetMetaDataQuery,
  useGetUserChartDataQuery,
  useGetProviderChartDataQuery,
} = metaDataApi;
