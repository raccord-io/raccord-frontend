import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '../models/projectModel';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

console.log(API_ENDPOINT);

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  tagTypes: ['Project'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ENDPOINT}`
  }),
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
    }),
    addFile: builder.mutation<void, Project>({
      query: (project) => ({
        url: '/upload',
        method: 'POST',
        body: project
      }),
      invalidatesTags: ['Project']
    }),
    getSequences: builder.query<Project[], string>({
      query: (projectId) => `/project/${projectId}/sequence`,
      providesTags: ['Project']
    }),
    getSequence: builder.query<Project[], { projectId: string; sequenceId: string }>({
      query: ({ projectId, sequenceId }) => `/project/${projectId}/sequence/${sequenceId}`,
      providesTags: ['Project']
    })
  })
});

export const {
  useProjectsQuery,
  useProjectQuery,
  useAddProjectMutation,
  useAddFileMutation,
  useGetSequencesQuery
} = projectsApi;
