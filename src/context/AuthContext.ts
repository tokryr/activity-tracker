import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  registerWithEmail: (email: string, password: string) => Promise<User | null>;
  loginWithEmail: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  registerWithEmail: async () => null,
  loginWithEmail: async () => null,
  logout: async () => {},
});
