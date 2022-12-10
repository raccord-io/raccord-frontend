import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '../models/projectModel';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  tagTypes: ['Project'],
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    projects: builder.query<Project[], void>({
      query: () => '/project',
      providesTags: ['Project']
    }),
    project: builder.query<Project, string>({
      query: (id) => `/project/${id}`,
      providesTags: ['Project']
    }),
    addProject: builder.mutation<void, Project>({
      query: (project) => ({
        url: '/project',
        method: 'POST',
        body: project
      }),
      invalidatesTags: ['Project']
    })
  })
});

export const { useProjectsQuery, useProjectQuery, useAddProjectMutation } = projectsApi;
