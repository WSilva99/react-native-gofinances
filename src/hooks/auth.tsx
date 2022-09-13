import { createContext, useContext } from "react";
import * as AuthSession from "expo-auth-session";

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "99",
    name: "Walmir Silva",
    email: "walmirsilva@gmail.com",
    photo: "https://avatars.githubusercontent.com/u/69635394?v=4",
  };

  async function signInWithGoogle() {
    try {
      // const CLIENT_ID = '6309085400-p2rpat11hhassvhuunncoulgukq6lo64.apps.googleusercontent.com';
      const CLIENT_ID = '6309085400-crle2ue6lr774ni35dtoiqlk76sm0n2e.apps.googleusercontent.com';
      const REDIRECT_URI = 'auth.expo.io/@wsilva99/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      console.log(response);

    } catch (error: any) {
      throw new Error(error);
    }
  }


  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };


