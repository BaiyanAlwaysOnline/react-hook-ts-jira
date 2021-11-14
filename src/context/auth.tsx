import React, { ReactNode, useContext, useState } from "react";
import * as auth from "auth-provider";
import { User } from "../types/user";

interface FormData {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | undefined
  | {
      user: User | undefined;
      login: (data: FormData) => void;
      register: (data: FormData) => void;
      logout: () => Promise<void>;
    }
>(undefined);

AuthContext.displayName = "AuthContext"; // 提供给devTool使用

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const login = (formData: FormData) => auth.login(formData).then(setUser);
  const register = (formData: FormData) =>
    auth.register(formData).then(setUser);
  const logout = () => auth.logout();
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return authContext;
};
