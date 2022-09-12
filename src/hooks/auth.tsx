import { createContext, useContext } from "react";

interface AuthContextData {
  user: User;
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

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };


