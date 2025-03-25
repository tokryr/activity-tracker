import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loginWithEmail, registerWithEmail, error: authError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let user = null;
      if (isRegistering) {
        user = await registerWithEmail(email, password);
      } else {
        user = await loginWithEmail(email, password);
      }

      if (user) {
        navigate({ to: '/' }); // Redirect to home on success
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        {isRegistering ? 'Create Account' : 'Sign In'}
      </h1>

      {authError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">{authError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : isRegistering ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
        </span>{' '}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
        >
          {isRegistering ? 'Sign In' : 'Create Account'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
