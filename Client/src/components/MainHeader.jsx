import { useAuth } from '../context/AuthContext';

const MainHeader = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
        </>
      )}
    </nav>
  );
};
