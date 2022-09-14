import { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";


// Env not working

// const CLIENT_ID = process.env.CLIENT_ENV;
// const REDIRECT_URI = process.env.REDIRECT_URI;

interface AuthContextData {
  user: User;
  loadingStorageUser: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthorizationResponse {
  type: string;
  params: {
    access_token: string;
  }
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loadingStorageUser, setLoadingStorageUser] = useState(true);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = '6309085400-p2rpat11hhassvhuunncoulgukq6lo64.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@wsilva99/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const {type, params} = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
      
      if(type === 'success') {
        const uri = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`;
        const response = await fetch(uri);
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo.picture,
        }
        
        setUser(userLogged);
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
      } else {
        throw new Error('Não foi possível autenticar');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if(credentials) {
        const name = credentials.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged = {
          id: String(credentials.user),
          email: credentials.email!,
          name,
          photo
        };

        setUser(userLogged);
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
      } else {
        throw new Error('Não foi possível autenticar');
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem('@gofinances:user');
  }

  async function loadUserStorageData() {
    const userStoraged = await AsyncStorage.getItem('@gofinances:user');

    if (userStoraged) {
      const userLogged = JSON.parse(userStoraged) as User;
      setUser(userLogged);
    }

    setLoadingStorageUser(false);
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loadingStorageUser, signInWithGoogle, signInWithApple, signOut }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };


