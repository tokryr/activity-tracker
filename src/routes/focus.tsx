import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { protectRoute } from '@/utils/routeUtils';
import FocusPage from '@/pages/FocusPage';
import { getTasks } from '@/services/taskService';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/focus',
  component: FocusPage,
  beforeLoad: async () => {
    await protectRoute();
    return {};
  },
  loader: async () => {
    const taskData = await getTasks();
    return {
      tasks: taskData.tasks,
      activeTaskId: taskData.activeTaskId,
    };
  },
});
