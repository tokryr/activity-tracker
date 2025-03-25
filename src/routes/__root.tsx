import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { AuthProvider } from '@/context/AuthContextProvider';
import { useAuth } from '@/hooks/useAuth';

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <RootComponent />
    </AuthProvider>
  ),
});

const RootComponent = () => {
  const { user, loading, logout } = useAuth();

  return (
    <>
      <nav style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="/" className="[&.active]:font-bold">
          Dashboard
        </Link>
        {user ? (
          <>
            <Link to="/focus" className="[&.active]:font-bold">
              Focus
            </Link>
            <Link to="/stats" className="[&.active]:font-bold">
              Stats
            </Link>
            <button onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
        )}
      </nav>
      <hr />
      {loading ? <div>Loading...</div> : <Outlet />}
    </>
  );
};
