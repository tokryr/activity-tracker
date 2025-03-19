import { logout } from '@/services/authService';
import { auth } from '@/services/firebase';

const Auth = () => {
  const user = auth.currentUser;

  return (
    <div className="auth-container">
      {user ? (
        <>
          <p>{user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default Auth;
