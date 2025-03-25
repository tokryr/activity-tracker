import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import FocusPage from '@/pages/FocusPage';
import { getTasks } from '@/services/taskService';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  // path: "/" is implied if the file is named index.tsx
  // but let's be explicit for clarity:
  path: '/',
  loader: async () => {
    const tasks = await getTasks();
    return { tasks };
  },
  component: FocusPage,
});
