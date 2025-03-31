import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import WelcomePage from '@/pages/WelcomePage';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: WelcomePage,
});
