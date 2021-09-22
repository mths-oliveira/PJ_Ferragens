import axios from 'axios';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { IUser } from '../core/user';

interface ContextProps {
  user: User;
  auth: {
    isAuthenticated: boolean;
    signUp: (user: IUser) => Promise<void>;
    signIn: (user: SignIn) => Promise<void>;
    signOut: () => Promise<void>;
  };
}

interface User {
  name: string;
  email: string;
}

interface SignIn {
  email: string;
  password: string;
}

interface SignUp extends SignIn {
  name: string;
  code: string;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext({} as ContextProps);

export function AuthContextProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const isUser = localStorage.getItem('auth_user');
    if (isUser) {
      const user: User = JSON.parse(isUser);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    setIsAuthenticated(!!user.name && !!user.email);
    localStorage.setItem('auth_user', JSON.stringify(user));
  }, [user]);

  async function signIn(user: SignIn) {
    const response = await axios.post<IUser>(
      '/api/sign-in',
      {
        email: user.email,
        password: user.password,
      },
      { validateStatus: null }
    );
    if (response.status !== 404) {
      const { name, email } = response.data;
      setUser({ name, email });
    } else {
      throw new Error('E-mail ou senha incorretos');
    }
  }

  async function signOut() {
    setUser({} as User);
  }

  async function signUp(user: SignUp) {
    const response = await axios.post(
      '/api/sign-up',
      {
        email: user.email,
        password: user.password,
        name: user.name,
        code: user.code,
      },
      { validateStatus: null }
    );
    switch (response.status) {
      case 409:
        throw new Error('Usúario já cadastrado');
      case 400:
        throw new Error('Código de segurança incorreto');
      default:
        const { email, name }: User = response.data;
        setUser({ email, name });
        return;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        auth: {
          isAuthenticated,
          signIn,
          signUp,
          signOut,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
