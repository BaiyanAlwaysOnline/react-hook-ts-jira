import React, { ReactNode, useContext } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";
import { getToken } from "auth-provider";
import request from "utils/request";
import { useMount } from "utils/hooks";
import { useAsync } from "utils/useAsync";
import { FullLoadingPage } from "components/libs";
import { message } from "antd";

interface FormData {
  username: string;
  password: string;
}

// 初始化启动User
const bootstrapUser = async () => {
  let user;
  let token = getToken();
  if (token) {
    const data = await request("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | undefined
  | {
      user: User | null;
      login: (data: FormData) => Promise<void>;
      register: (data: FormData) => Promise<void>;
      logout: () => Promise<void>;
    }
>(undefined);

AuthContext.displayName = "AuthContext"; // 提供给devTool使用

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    data: user,
    error,
    isLoading,
    isIdle,
    setData: setUser,
  } = useAsync<User | null>();
  const login = async (formData: FormData) => {
    const res = await auth.login(formData);
    setUser(res);
  };
  const register = async (formData: FormData) => {
    const res = await auth.register(formData);
    setUser(res);
  };

  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
    });

  useMount(() => {
    run(bootstrapUser());
  });

  if (error) message.error("接口异常，请稍后再试！");
  if (isIdle || isLoading) return <FullLoadingPage tip={"正在努力加载中..."} />;

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
