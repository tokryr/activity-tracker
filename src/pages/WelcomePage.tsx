import { Link } from '@tanstack/react-router';
import { useAuth } from '@/context/AuthContext';

const WelcomePage = () => {
  const { user } = useAuth();
  console.log('user', user);
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Activity Tracker</h1>

      <p className="mb-6 text-gray-600">
        A simple tool to help you focus on tasks and track your productivity.
      </p>

      {user ? (
        <div className="space-y-4">
          <p className="mb-4">
            Welcome back, <span className="font-semibold">{user.email}</span>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/focus"
              className="block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Start Focusing
            </Link>

            <Link
              to="/stats"
              className="block bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              View Statistics
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="mb-4">
            Sign in to start tracking your activities and improve your productivity.
          </p>

          <Link
            to="/login"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>
      )}

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">What You Can Do</h2>
        <ul className="text-left list-disc pl-5 space-y-2">
          <li>Track tasks and mark them as complete</li>
          <li>Use the Pomodoro timer to stay focused</li>
          <li>View statistics about your productivity</li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomePage;
