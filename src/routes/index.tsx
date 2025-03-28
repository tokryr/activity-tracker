import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import WelcomePage from '@/pages/WelcomePage';
import { getTasks } from '@/services/taskService';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  loader: async () => {
    const tasks = await getTasks();
    return { tasks };
  },
  component: WelcomePage,
});
