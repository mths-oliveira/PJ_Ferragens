import axios from 'axios';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { IUser } from '../core/user';
import { Cache } from '../utils/cache';

interface ContextProps {
  name: string;
  email: string;
  auth: {
    isAuthenticated: boolean;
    signIn: (user: AuthenticateProps) => Promise<void>;
    signUp: (user: IUser) => Promise<void>;
    signOut: () => Promise<void>;
  };
}

interface AuthProps {
  name: string;
  email: string;
}

interface AuthenticateProps {
  email: string;
  password: string;
}

interface SignUp {
  email: string;
  password: string;
  name: string;
  code: string;
}

interface Props {
  children: ReactNode;
}

let cache: Cache<AuthProps>;
const AuthContext = createContext({} as ContextProps);

export function AuthContextProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    cache = new Cache<AuthProps>('auth_user');
    const auth = cache.getItem();
    if (!auth) return;
    setName(auth.name);
    setEmail(auth.email);
  }, []);

  useEffect(() => {
    const isAuthenticated = !!name && !!email;
    setIsAuthenticated(isAuthenticated);
    cache.setItem({ email, name }, 24);
  }, [name, email]);

  async function signIn(user: AuthenticateProps) {
    const response = await axios.post<IUser>(
      '/api/sign-in',
      {
        email: user.email,
        password: user.password,
      },
      { validateStatus: null }
    );
    if (response.status !== 404) {
      const { email, name } = response.data;
      setName(name);
      setEmail(email);
    } else {
      throw new Error('E-mail ou senha incorretos');
    }
  }

  async function signOut() {
    setName('');
    setEmail('');
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
        setName(response.data.name);
        setEmail(response.data.email);
        return;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        email,
        name,
        auth: {
          isAuthenticated,
          signIn,
          signOut,
          signUp,
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
