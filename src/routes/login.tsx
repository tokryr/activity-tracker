import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import LoginPage from '@/pages/LoginPage';

interface LoginSearchParams {
  redirectTo?: string;
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/login',
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): LoginSearchParams => {
    return {
      redirectTo: typeof search.redirectTo === 'string' ? search.redirectTo : '/',
    };
  },
  beforeLoad: ({ search }) => {
    return { redirectTo: search.redirectTo };
  },
});
