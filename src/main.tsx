import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import './styles.css';
import { routeTree } from './routeTree.gen'; // auto-generated!

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
