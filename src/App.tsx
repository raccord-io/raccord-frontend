import React from 'react';
import './App.css';

import { NavBar } from './components/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProjectsGallery from './pages/ProjectsGallery/ProjectsGallery';
import Project from './pages/Project/Project';

import { NavBarApp } from './components/index';
import HomePage from './pages/HomePage/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <NavBar />
        <HomePage />
      </div>
    )
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
    path: '/project/:projectId',
    element: (
      <div>
        <NavBarApp />
        <Project />
      </div>
    )
  }
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
