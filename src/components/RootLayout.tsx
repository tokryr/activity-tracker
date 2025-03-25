import { Outlet, Link } from '@tanstack/react-router';

const RootLayout = () => (
  <div>
    <nav>
      <Link to="/">Tasks</Link> | <Link to="/">Statistics</Link>
    </nav>
    <Outlet />
  </div>
);

export default RootLayout;
