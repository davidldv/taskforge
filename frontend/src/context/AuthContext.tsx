import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apiFetch, AUTH_API_URL } from '../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signIn: (credentials: any) => Promise<void>;
  signUp: (credentials: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(`${AUTH_API_URL}/sign-in`, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign in');
      }

      setUser(data.data.user);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(`${AUTH_API_URL}/sign-up`, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      setUser(data.data.user);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await apiFetch(`${AUTH_API_URL}/sign-out`, {
        method: 'POST',
      });
      setUser(null);
      localStorage.removeItem('user');
    } catch (err: any) {
      console.error('Sign out failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      error,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
