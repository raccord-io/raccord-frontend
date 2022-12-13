import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '../models/projectModel';
import { Tag } from '../models/tagModel';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

console.log(API_ENDPOINT);

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  tagTypes: ['Project', 'Tag'],
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
        enctype: 'multipart/form-data',
        method: 'POST',
        body: project
      }),
      invalidatesTags: ['Project']
    }),
    addFile: builder.query<Project[], string>({
      query: (projectId) => `/project/${projectId}/upload`,
      providesTags: ['Project']
    }),
    getSequences: builder.query<Project[], string>({
      query: (projectId) => `/project/${projectId}/sequence`,
      providesTags: ['Project']
    }),
    getSequence: builder.query<Project[], { projectId: string; sequenceId: string }>({
      query: ({ projectId, sequenceId }) => `/project/${projectId}/sequence/${sequenceId}`,
      providesTags: ['Project']
    }),
    addTag: builder.mutation<void, { projectId: string; tag: Tag }>({
      query: ({ projectId, tag }) => ({
        url: `project/${projectId}/tag`,
        method: 'POST',
        body: tag
      }),
      invalidatesTags: ['Project', 'Tag']
    }),
    deleteTag: builder.mutation<void, { projectId: string; tagId: string }>({
      query: ({ projectId, tagId }) => ({ url: `/project/${projectId}/${tagId}`, method: 'DELETE' })
    })
  })
});

export const {
  useProjectsQuery,
  useProjectQuery,
  useAddProjectMutation,
  useAddFileQuery,
  useGetSequencesQuery,
  useGetSequenceQuery,
  useAddTagMutation
} = projectsApi;
