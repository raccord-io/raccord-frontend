import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '../models/projectModel';
import { CreateTagDto } from '../models/tagModel';
import { Category } from '../models/categoryModel';

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
        method: 'POST',
        body: project
      }),
      invalidatesTags: ['Project']
    }),
    addFile: builder.query<Project[], string>({
      query: (projectId) => `/project/${projectId}/upload`,
      providesTags: ['Project']
    }),
    addSequence: builder.mutation<void, { projectId: string; name: string }>({
      query: ({ projectId, name }) => ({
        url: `/project/${projectId}/sequence`,
        method: 'POST',
        body: { name: name }
      }),
      invalidatesTags: ['Project']
    }),
    getSequencesName: builder.query<Project[], string>({
      query: (projectId) => `/project/${projectId}/sequence`,
      providesTags: ['Project']
    }),
    getSequence: builder.query<any, { projectId: string; sequenceId: string }>({
      query: ({ projectId, sequenceId }) => `/project/${projectId}/sequence/${sequenceId}`
    }),
    addTag: builder.mutation<void, { projectId: string; tag: CreateTagDto }>({
      query: ({ projectId, tag }) => ({
        url: `project/${projectId}/tag`,
        method: 'POST',
        body: tag
      }),
      invalidatesTags: ['Project', 'Tag']
    }),
    deleteTag: builder.mutation<void, { projectId: string; tagId: string }>({
      query: ({ projectId, tagId }) => ({
        url: `/project/${projectId}/tag/${tagId}`,
        method: 'DELETE'
      })
    }),
    getCategories: builder.query<Category[], string>({
      query: (projectId) => ({ url: `project/${projectId}/category`, methode: 'GET' })
    })
  })
});

export const {
  useProjectsQuery,
  useProjectQuery,
  useAddProjectMutation,
  useAddFileQuery,
  useAddSequenceMutation,
  useGetSequencesNameQuery,
  useGetSequenceQuery,
  useAddTagMutation,
  useGetCategoriesQuery
} = projectsApi;
