import {
  createAsyncThunk,
  // createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';

import { apiRequest } from '../helpers/api';

export type Project = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
};

interface ProjectState {
  saved: boolean;
  loading: boolean;
  error: any;
  projects: {
    byId: { [id: string]: Project };
    allIds: string[];
  };
}

const initialState: ProjectState = {
  saved: false,
  loading: false,
  error: null,
  projects: {
    byId: {},
    allIds: []
  }
};

export const getProjects = createAsyncThunk('getProjects', async () => {
  return await apiRequest<Project[]>('GET', '/project');
});

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state: ProjectState) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state: ProjectState, { payload }) => {
        state.loading = false;
        const projectsIds = payload.map((project) => project._id);
        const projectsById = payload.reduce(
          (acumulator, project: Project) => ({
            ...acumulator,
            [project._id]: project
          }),
          {}
        );
        state.projects = {
          ...state.projects,
          allIds: projectsIds,
          byId: projectsById
        };
      })
      .addCase(getProjects.rejected, (state: ProjectState, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }
});

export default projectSlice.reducer;
