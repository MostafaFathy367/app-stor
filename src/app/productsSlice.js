import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (search) => `/products/search?q=${search}`,
    }),
    updateProduct: builder.mutation({
      query: (data) => {
        const { id, body } = data;
        return {
          url: `products/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `products/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
