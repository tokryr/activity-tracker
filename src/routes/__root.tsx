import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="/" className="[&.active]:font-bold">
          Dashboard
        </Link>
        <Link to="/login" className="[&.active]:font-bold">
          Login
        </Link>
      </nav>
      <hr />
      <Outlet />
    </>
  ),
});
