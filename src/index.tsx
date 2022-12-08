import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import ProjectsGallery from './pages/ProjectsGallery/ProjectsGallery';
import Project from './pages/Project/Project';
import reportWebVitals from './reportWebVitals';

import { NavBarApp } from './components/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/projects',
    element: (
      <div>
        <NavBarApp />
        <ProjectsGallery />
      </div>
    )
  },
  {
    path: '/project',
    element: (
      <div>
        <NavBarApp />
        <Project />
      </div>
    )
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
