import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../models/categoryModel';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Category'],
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    categories: builder.query<Category[], void>({
      query: () => '/category',
      providesTags: ['Category']
    }),
    category: builder.query<Category, string>({
      query: (id) => `/category/${id}`,
      providesTags: ['Category']
    }),
    addCategory: builder.mutation<void, Category>({
      query: (category) => ({
        url: '/category',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['Category']
    })
  })
});

export const { useCategoriesQuery, useCategoryQuery, useAddCategoryMutation } = categoriesApi;
