import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { projectsApi } from '../services/projectApi';

export const store = configureStore({
  reducer: {
    [projectsApi.reducerPath]: projectsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectsApi.middleware)
});
